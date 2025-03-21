import { NextConfig } from "next";


const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'auc-pctr.c.yimg.jp',
            }, {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            }, {
                protocol: 'https',
                hostname: 's.yimg.jp'
            }, {
                protocol: 'https',
                hostname: 'auctions.c.yimg.jp'
            }
        ],
        //minimumCacheTTL: 60 * 15 //cache lại 15 phút
    }
}

export const allowedDomains = nextConfig?.images?.remotePatterns?.map((p) => p.hostname);

export default nextConfig;
