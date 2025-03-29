import { encode, getToken } from "next-auth/jwt";
import { ResponseCookie, ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export interface IAuthCookieData {
    id: string,
    name: string,
    email: string,
    lastName: string,
    firstName: string,
    accessToken: string,
    exp?: number

}

export const cookieConfig = (maxAge: number = 60 * 60 * 24 * 7) => {
    let expireDate = new Date();
    if (maxAge) {
        expireDate.setSeconds(maxAge);
    }
    else {
        expireDate = new Date(0)
    }
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: maxAge,
        sameSite: "lax",
        expires: expireDate
    } as Partial<ResponseCookie>
}


export const setAuthCookie = async (cookieStore: ResponseCookies | ReadonlyRequestCookies, data: IAuthCookieData) => {
    const token = await encode({
        secret: process.env.NEXTAUTH_SECRET!,
        token: {
            id: data.id,
            name: data.name,
            email: data.email,
            lastName: data.lastName,
            firstName: data.firstName,
            accessToken: data.accessToken,
        },
    });

    cookieStore.set("auth-token", token, cookieConfig());
}

export const deleteAuthCookie = async (cookieStore: ResponseCookies | ReadonlyRequestCookies) => {
    cookieStore.set("auth-token", "", cookieConfig(0));
}

export const getAuthCookie = async (req: NextRequest) => {
    return (await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET!,
        cookieName: "auth-token", // Lấy JWT từ cookie
    })) as (IAuthCookieData | null)
}


export async function getServerAuthCookie(): Promise<IAuthCookieData | null> {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const currentPath = headersList.get("referer") || "/";
    const currentUrl = `${protocol}://${host}${new URL(currentPath, `${protocol}://${host}`).pathname}`;
    const cookieStore = await cookies();
    const req = new NextRequest(currentUrl);

    cookieStore.getAll().map(c => {
        req.cookies.set(c.name, c.value)
    })
    return await getAuthCookie(req);
}