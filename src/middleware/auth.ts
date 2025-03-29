/* eslint-disable @typescript-eslint/no-explicit-any */
import { middlewareFn } from "@/middleware";
import { deleteAuthCookie, getAuthCookie, getServerAuthCookie, setAuthCookie } from "@/utils/auth-cookie";
import { AppConfig } from "@/utils/config";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const config = {
    paths: ["/api/jbb/api/v1/appUsers/", "/user-info"],
    excludePaths: [
        "/api/jbb/api/v1/appUsers/login",
        "/api/jbb/api/v1/appUsers/register",
        "/api/jbb/api/v1/appUsers/forgot-password",
        "/api/jbb/api/v1/appUsers/reset-password",
        "/api/jbb/api/v1/appUsers/email"
    ]
}


export async function authMiddleware(req: NextRequest, middlewares: middlewareFn[]) {
    const { pathname } = req.nextUrl;
    const token = await getAuthCookie(req);

    if (config.paths.find(x => pathname.startsWith(x)) && !config.excludePaths.find(x => pathname.startsWith(x))) {
        let isAuth = true;
        if (token && token.accessToken) {
            req.headers.set("Authorization", "Bearer " + token.accessToken);
            let res = null;
            if (middlewares?.length) {
                res = await middlewares[0](req, middlewares.slice(1))
            } else {
                res = NextResponse.next();
            }
            if (res.status === 401) {
                //nếu unauthen thì gọi refresh token
                const resRefresh = await fetch(`${AppConfig.JBB_API}/api/v1/appUsers/refresh-token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token.accessToken
                    },
                });

                const resObj = await resRefresh.json();
                if (resRefresh.ok && resObj?.token) {

                    req.headers.set("Authorization", "Bearer " + resObj?.token);
                    res = await middlewares[0](req, middlewares.slice(1))

                    await setAuthCookie(res.cookies, {
                        name: token.name,
                        email: token.email,
                        id: token.id,
                        lastName: token.lastName,
                        firstName: token.firstName,
                        accessToken: resObj?.token
                    });
                } else {
                    isAuth = false;
                }
            } else {

                const now = Math.floor(Date.now() / 1000); // Chuyển thời gian hiện tại sang giây
                const remainingSeconds = (token.exp as number) - now; // Tính thời gian còn lại (giây)

                if (remainingSeconds <= 60 * 60 * 24 * 6) {
                    await setAuthCookie(res.cookies, {
                        name: token.name,
                        email: token.email,
                        id: token.id,
                        lastName: token.lastName,
                        firstName: token.firstName,
                        accessToken: token.accessToken
                    });
                }
            }
            if (isAuth) {
                return res;
            }
        } else {
            isAuth = false;
        }

        if (!isAuth) {
            let res = null;
            if (pathname.startsWith("/api/")) {
                res = NextResponse.json({ message: 'Phiên làm việc hết hạn' }, { status: 401 });
            } else {
                res = NextResponse.redirect(new URL("/login?callbackUrl=" + encodeURIComponent(pathname), req.url));
            }
            if (token) {
                await deleteAuthCookie(res.cookies);
            }

            return res;
        }
    } else {
        let res = null;
        if (middlewares?.length) {
            res = await middlewares[0](req, middlewares.slice(1))
        } else {
            res = NextResponse.next();
        }
        if (token) {
            const now = Math.floor(Date.now() / 1000); // Chuyển thời gian hiện tại sang giây
            const remainingSeconds = (token.exp as number) - now; // Tính thời gian còn lại (giây)

            if (remainingSeconds <= 60 * 60 * 24 * 6) {
                await setAuthCookie(res.cookies, {
                    name: token.name,
                    email: token.email,
                    id: token.id,
                    lastName: token.lastName,
                    firstName: token.firstName,
                    accessToken: token.accessToken
                })
            }
        }
        return res;
    }
    return NextResponse.next();
}

export async function fetchSSR(url: string, init?: RequestInit) {
    init = init || {};
    init.headers = init.headers || {};

    const { pathname } = new URL(url, "http://localhost:3000");
    if (config.paths.find(x => pathname.startsWith(x) || ('/api/jbb' + pathname).startsWith(x)) && !config.excludePaths.find(x => pathname.startsWith(x) || ('/api/jbb' + pathname).startsWith(x))) {
        const auth = await getServerAuthCookie();
        if (auth && auth.accessToken) {
            (init.headers as any).Authorization = "Bearer " + auth.accessToken;
            const res = await fetch(url, init);
            if (res.status === 401) {
                const cookieStore = await cookies();
                const resRefresh = await fetch(`${AppConfig.JBB_API}/api/v1/appUsers/refresh-token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + auth.accessToken
                    },
                });

                if (resRefresh.ok) {
                    const resObj = await resRefresh.json();
                    (init.headers as any).Authorization = "Bearer " + resObj.token;

                    //cập nhât token mới
                    await setAuthCookie(cookieStore, {
                        name: auth.name,
                        email: auth.email,
                        id: auth.id,
                        lastName: auth.lastName,
                        firstName: auth.firstName,
                        accessToken: resObj.token
                    })

                    return fetch(url, init);
                } else {
                    // xóa cookie
                    await deleteAuthCookie(cookieStore);
                    const headersList = await headers();
                    const host = headersList.get("host");
                    const protocol = headersList.get("x-forwarded-proto") || "http";
                    const currentPath = headersList.get("referer") || "/";

                    const currentUrl = `${protocol}://${host}${new URL(currentPath, `${protocol}://${host}`).pathname}`;

                    return redirect(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
                }
            } else {
                return res;
            }
        } else {
            const headersList = await headers();
            const host = headersList.get("host");
            const protocol = headersList.get("x-forwarded-proto") || "http";
            const currentPath = headersList.get("referer") || "/";

            const currentUrl = `${protocol}://${host}${new URL(currentPath, `${protocol}://${host}`).pathname}`;

            return redirect(`/login?callbackUrl=${encodeURIComponent(currentUrl)}`);
        }
    }
    return fetch(url, init);
}
