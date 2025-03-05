import { AccessOptions, proxy } from "@/utils/proxy";

export async function OPTIONS(req: Request) {
    return await AccessOptions(req);
}

export async function GET(req: Request, res: Response) {
    return await handleRequest(req, res);
}

export async function POST(req: Request, res: Response) {
    return await handleRequest(req, res);
}

export async function PUT(req: Request, res: Response) {
    return await handleRequest(req, res);
}

export async function DELETE(req: Request, res: Response) {
    return await handleRequest(req, res);
}


async function handleRequest(req: Request, res: Response) {
    const { searchParams } = new URL(req.url);
    const isPublic = searchParams.get("public")?.toString() === "false" ? false : true;
    return await proxy(req, res, "/api/jbb", process.env.JBB_API as string, isPublic, (header, session) => {
        if (!isPublic && session?.jwtToken) {
            header.Authorization = `Bearer ${session?.jwtToken}`;
        }
        return { ...header };
    })
}