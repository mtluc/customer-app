import { NextResponse } from "next/server";
import { getSession, ISession } from "./session";
import { devLog } from "./utils";

export async function AccessOptions(req: Request) {
    const { origin } = new URL(req.url);
    const currentOrigin = req.headers.get("origin") || origin;
    return NextResponse.json(
        {},
        {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": currentOrigin,
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        }
    );
}

export async function proxy(
    req: Request,
    res: Response,
    apiUrlFrom: string,
    apiUrlTo: string,
    isPublic: boolean,
    setHeader: (headers: any, session: ISession) => any
) {
    try {
        const resObj: {
            status: number,
            body?: BodyInit,
            contentType: string
        } = {
            status: 200,
            contentType: "application/json"
        };

        const { origin } = new URL(req.url);
        const currentOrigin = req.headers.get("origin") || origin;

        const session = await getSession(req, res);

        if (!isPublic &&
            (!session ||
                !session.jwtToken ||
                new Date() >= new Date(Date.parse(session?.tokenTimeout as any))
            )
        ) {
            resObj.status = 401;
            resObj.body = JSON.stringify({ message: "Phiên làm việc hết hạn" });
        } else {
            const method = req.method;
            const fullUrl = `${apiUrlTo}${req.url?.replace(origin, "")?.replace(apiUrlFrom, "")}`;
            const body = method === "GET" || method === "HEAD" ? null : await req.text();

            const response = await fetch(fullUrl, {
                method,
                headers: setHeader({
                    "Content-Type": req.headers.get("content-type") || "application/json",
                }, session),
                body,
            });

            devLog(fullUrl);

            if (response.ok) {
                resObj.contentType = response.headers.get("content-type") || "application/octet-stream";
                if (resObj.contentType.includes("application/json")) {
                    resObj.body = JSON.stringify(await response.json());
                } else if (resObj.contentType.includes("text")) {
                    resObj.body = await response.text();
                } else {
                    resObj.body = await response.arrayBuffer();
                }
            } else {
                console.error("error", fullUrl);
                const text = await response.text();
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
                } catch (error) {
                    error = text;
                }
                resObj.status = response.status;
                resObj.body = error?.message || text;
            }
        }

        return new NextResponse(resObj.body, {
            status: resObj.status,
            headers: {
                ...res.headers,
                "Content-Type": resObj.contentType,
                "Access-Control-Allow-Origin": currentOrigin,
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: "Lỗi proxy!" }, { status: 500 });
    }
}
