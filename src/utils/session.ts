
import { getIronSession, SessionOptions } from "iron-session";
export const sessionOptions: SessionOptions = {
    cookieName: "JBB_COOKIE",
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400
    },
};

export interface ISession {
    jwtToken?: string;
    tokenTimeout?: Date;
}


export async function getSession(req: Request, res: Response) {
    return await getIronSession<ISession>(req, res, sessionOptions);
}
