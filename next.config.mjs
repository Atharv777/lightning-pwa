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
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                },
            },
        },
        {
            urlPattern: /\.(?:png|jpg|jpeg|gif|webp|svg|ico)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'image-cache',
                expiration: {
                    maxEntries: 100,
                },
            },
        },
        {
            urlPattern: /.*\.(?:js|css|html)$/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'static-resources',
            },
        },
    ]
})(nextConfig);
