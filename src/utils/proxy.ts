import { NextApiRequest, NextApiResponse } from "next";

export const proxy = async (
    req: NextApiRequest,
    res: NextApiResponse,
    apiUrlFrom: string,
    apiUrlTo: string,
    isPublic: boolean,
    setHeader: (headers: any, session: ISession) => any
) => {

}