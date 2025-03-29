import { setAuthCookie } from "@/utils/auth-cookie";
import { AppConfig } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as {
            email: string,
            password: string
        };

        if (!body?.email) {
            throw 'Email không được để trống'
        }

        if (!body?.password) {
            throw 'Mật khẩu không được để trống'
        }

        const res = await fetch(`${AppConfig.JBB_API}/api/v1/appUsers/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        if (!res.ok) {
            return NextResponse.json(data, { status: 401 });
        }

        const response = NextResponse.json({
            id: data.id,
            lastName: data.lastName,
            firstName: data.firstName,
            isVerified: data.isVerified,
            name: [data.lastName, data.firstName].filter(x => x).join(" "),
            email: data.email
        }, { status: 200 });

        await setAuthCookie(response.cookies, {
            id: data.id,
            lastName: data.lastName,
            firstName: data.firstName,
            name: [data.lastName, data.firstName].filter(x => x).join(" "),
            email: data.email,
            accessToken: data.token
        })

        return response;

    } catch (error) {
        return NextResponse.json({
            message: error
        }, { status: 401 });
    }
}