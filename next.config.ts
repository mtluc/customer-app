import { NextConfig } from "next";


const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/(.*)", // Áp dụng cho tất cả các route
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value:
                            // "script-src 'self' https://translate.google.com 'unsafe-inline'; " +
                            "frame-src 'self' https://translate.google.com; " +
                            // "connect-src 'self' https://translate.googleapis.com; " +
                            // "img-src 'self' https://translate.google.com data:; " +
                            // "style-src 'self' 'unsafe-inline';",
                            ""
                    },
                ],
            },
        ];
    },
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
