/* eslint-disable @typescript-eslint/no-explicit-any */
import { middlewareFn } from "@/middleware";
import { AppConfig } from "@/utils/config";
import { encode, getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(req: NextRequest, middlewares: middlewareFn[]) {
    const { pathname } = req.nextUrl;
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET!,
        cookieName: "auth-token", // Lấy JWT từ cookie
    });

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
                    const _token = await encode({
                        secret: process.env.NEXTAUTH_SECRET!,
                        token: {
                            name: token.name,
                            email: token.email,
                            id: token.id,
                            lastName: token.lastName,
                            firstName: token.firstName,
                            accessToken: resObj?.token,
                        },
                    });

                    req.headers.set("Authorization", "Bearer " + resObj?.token);
                    res = await middlewares[0](req, middlewares.slice(1))

                    res.cookies.set("auth-token", _token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        path: "/",
                        maxAge: 60 * 60 * 24 * 7,
                        sameSite: "strict"
                    });
                } else {
                    isAuth = false;
                }
            } else {

                const now = Math.floor(Date.now() / 1000); // Chuyển thời gian hiện tại sang giây
                const remainingSeconds = (token.exp as number) - now; // Tính thời gian còn lại (giây)

                if (remainingSeconds <= 60 * 60 * 24 * 6) {
                    const _token = await encode({
                        secret: process.env.NEXTAUTH_SECRET!,
                        token: {
                            name: token.name,
                            email: token.email,
                            id: token.id,
                            lastName: token.lastName,
                            firstName: token.firstName,
                            accessToken: token.accessToken,
                        },
                    });

                    res.cookies.set("auth-token", _token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        path: "/",
                        maxAge: 60 * 60 * 24 * 7,
                        sameSite: "strict"
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
                res.cookies.set("auth-token", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    expires: new Date(0),
                    sameSite: "strict"
                });
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
                const _token = await encode({
                    secret: process.env.NEXTAUTH_SECRET!,
                    token: {
                        name: token.name,
                        email: token.email,
                        id: token.id,
                        lastName: token.lastName,
                        firstName: token.firstName,
                        accessToken: token.accessToken,
                    },
                });

                res.cookies.set("auth-token", _token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7,
                    sameSite: "strict"
                });
            }
        }
        return res;
    }
    return NextResponse.next();
}

const config = {
    paths: ["/api/jbb/api/v1/appUsers/", "/user-info"],
    excludePaths: ["/api/jbb/api/v1/appUsers/login"]
}

export async function getServerAuthState(): Promise<{
    id: string,
    lastName?: string,
    firstName?: string
    name?: string,
    email: string,
    accessToken: string,
    exp: number
} | null> {
    const headersList = await headers();
    const cookieStore = await cookies();
    const req = new NextRequest(headersList.get("referer") || headersList.get("origin") || headersList.get("host") || "")
    cookieStore.getAll().map(c => {

        req.cookies.set(c.name, c.value)

    })
    return await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET!,
        cookieName: 'auth-token'
    }) as any;
}