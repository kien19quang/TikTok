/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['files.fullstack.edu.vn', 'p16-sign-va.tiktokcdn.com'],
    },
};

module.exports = nextConfig;
