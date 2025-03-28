import { NextRequest, NextResponse } from "next/server";
import { forWardApiMiddleware } from "./middleware/forward-api";
import { authMiddleware } from "./middleware/auth";

export type middlewareFn = (req: NextRequest,middlewares: middlewareFn[])=> Promise<NextResponse>

function applyMiddlewares(...middlewares: middlewareFn[]) {
    return async (req: NextRequest) => {
        if (middlewares?.length) {
            return await middlewares[0](req, middlewares.slice(1))
        }
        return NextResponse.next();
    };
}
export const middleware = applyMiddlewares(authMiddleware, forWardApiMiddleware);
export const config = {
    matcher: "/:path*"
};