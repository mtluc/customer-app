/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppConfig } from "@/utils/config";
import { AccessOptions, proxy } from "@/utils/proxy";
import { NextRequest, NextResponse } from "next/server";

// export async function OPTIONS(req: NextRequest, context: { params: { jbb: string[] } }) {
//     return await AccessOptions(req);
// }

export async function GET(req: NextRequest, res: NextResponse, context: { params: { jbb: string[] } }) {
    return await handleRequest(req, res);
}

export async function POST(req: NextRequest, res: NextResponse, context: { params: { jbb: string[] } }) {
    return await handleRequest(req, res);
}

export async function PUT(req: NextRequest, res: NextResponse, context: { params: { jbb: string[] } }) {
    return await handleRequest(req, res);
}

export async function DELETE(req: NextRequest, res: NextResponse, context: { params: { jbb: string[] } }) {
    return await handleRequest(req, res);
}


async function handleRequest(req: NextRequest, res: NextResponse) {
    const { searchParams } = new URL(req.url);
    const isPublic = searchParams.get("public")?.toString() === "false" ? false : true;
    return await proxy(req, res, "/api/jbb", AppConfig.JBB_API as string, isPublic, (header, session) => {
        if (!isPublic && session?.jwtToken) {
            header.Authorization = `Bearer ${session?.jwtToken}`;
        }
        return { ...header };
    })
}