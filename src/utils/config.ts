
interface IAppConfig {
    JBB_API: string
    SESSION_SECRET: string,
    NODE_ENV: 'production' | 'development',
    SHARE_KEY:any
}

export const AppConfig: IAppConfig = {
    JBB_API: process.env.JBB_API || "",
    SESSION_SECRET: process.env.SESSION_SECRET || "",
    NODE_ENV: process.env.NODE_ENV as any,
    SHARE_KEY: process.env.NEXT_PUBLIC_SHARE_KEY
}