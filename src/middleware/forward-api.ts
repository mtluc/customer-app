/* eslint-disable @typescript-eslint/no-explicit-any */
import { middlewareFn } from "@/middleware";
import { AppConfig } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";

export async function forWardApiMiddleware(req: NextRequest, middlewares: middlewareFn[]) {
    const { pathname } = req.nextUrl;
    if (config.paths.find(x => pathname.startsWith(x))) {

        const { origin } = new URL(req.url);
        const currentOrigin = req.headers.get("origin") || origin;
        const fullUrl = `${AppConfig.JBB_API}${req.url?.replace(origin, "")?.replace("/api/jbb", "")}`;
        const body = req.method === "GET" || req.method === "HEAD" ? null : await req.text();
        const headers: any = {
            "Content-Type": req.headers.get("content-type") || "application/json",
        };
        const authorization = req.headers.get("Authorization");
        if (authorization) {
            headers.Authorization = authorization
        }

        const resObj: {
            status: number,
            body?: BodyInit,
            contentType: string
        } = {
            status: 200,
            contentType: "application/json"
        };

        const res = await fetch(fullUrl, {
            method: req.method,
            headers: headers,
            body,
        });
        console.log(fullUrl);

        if (res.ok) {
            resObj.contentType = res.headers.get("content-type") || "application/octet-stream";
            if (resObj.contentType.includes("application/json")) {
                resObj.body = JSON.stringify(await res.json());
            } else if (resObj.contentType.includes("text")) {
                resObj.body = await res.text();
            } else {
                resObj.body = await res.arrayBuffer();
            }
        } else {
            console.error("error", fullUrl, res.status);
            const text = await res.text();
            let error: any = "";
            try {
                error = JSON.parse(text);
                if (error.errors) {
                    if (typeof error.errors === "object") {
                        let strError = "";

                        for (const key in error.errors) {
                            if (Object.prototype.hasOwnProperty.call(error.errors, key)) {
                                const errors = error.errors[key];
                                strError = (errors as any[])?.join?.("\n") || `\n${errors}`;
                            }
                        }
                        error = strError;
                    } else {
                        error = error.errors;
                    }
                } else if (error.message) {
                    error = error.message;
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_error: any) {
                error = text;
            }
            resObj.status = res.status;
            resObj.body = error?.message || text;
        }

        return new NextResponse(resObj.body, {
            status: resObj.status,
            headers: {
                ...res.headers,
                "Content-Type": resObj.contentType,
                "Access-Control-Allow-Origin": currentOrigin,
            },
        });
    }
    if (middlewares?.length) {
        return await middlewares[0](req, middlewares.slice(1))
    }
    return NextResponse.next();
}

const config = {
    paths: ["/api/jbb/"],
};