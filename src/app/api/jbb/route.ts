import { NextResponse } from "next/server";

const TARGET_URL = "https://jsonplaceholder.typicode.com/posts"; // 🔹 API đích

export async function OPTIONS() {
    // ✅ Cho phép tất cả phương thức & Content-Type (CORS)
    return NextResponse.json(
        {},
        {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        }
    );
}

export async function GET(req: Request) {
    return handleRequest(req);
}

export async function POST(req: Request) {
    return handleRequest(req);
}

export async function PUT(req: Request) {
    return handleRequest(req);
}

export async function DELETE(req: Request) {
    return handleRequest(req);
}

async function handleRequest(req: Request) {
    try {
        const method = req.method; // ✅ Lấy phương thức HTTP (GET, POST, PUT, DELETE,...)

        // ✅ Đọc header Content-Type
        const contentType = req.headers.get("content-type") || "application/json";

        // ✅ Đọc query string và gắn vào URL
        const { searchParams } = new URL(req.url);
        const fullUrl = `${TARGET_URL}?${searchParams.toString()}`;

        // ✅ Đọc body nếu không phải GET/HEAD
        const body = method === "GET" || method === "HEAD" ? null : await req.text();

        // ✅ Chuyển tiếp request đến API đích
        const response = await fetch(fullUrl, {
            method,
            headers: {
                "Content-Type": contentType, // Giữ nguyên Content-Type
                Authorization: req.headers.get("authorization") || "",
            },
            body,
        });

        // ✅ Lấy dữ liệu từ API đích
        const data = await response.json();

        return NextResponse.json(data, {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Cho phép CORS
            },
        });
    } catch {
        return NextResponse.json({ error: "Lỗi proxy!" }, { status: 500 });
    }
}
