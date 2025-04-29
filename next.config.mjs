/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';

const nextConfig = {
    reactStrictMode: true
};

export default withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development' ? false : false,
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/lighitning-pwa\.vercel\.app\/.*$/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'site-cache',
                expiration: {
                    maxEntries: 200,
                    maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
                },
                cacheableResponse: {
                    statuses: [0, 200],
                },
            },
        },
        {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'google-fonts',
                expiration: {
                    maxEntries: 30,
                    maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
                },
            },
        },
    ]
})(nextConfig);
