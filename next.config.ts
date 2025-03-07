import { NextConfig } from "next";


const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'auc-pctr.c.yimg.jp',
            }
        ],
        minimumCacheTTL: 60 * 60 * 24 * 1 //cache lại 1 ngày
    }
}

export const allowedDomains = nextConfig?.images?.remotePatterns?.map((p) => p.hostname);

export default nextConfig;
