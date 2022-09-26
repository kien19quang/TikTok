/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['files.fullstack.edu.vn', 'p16-sign-va.tiktokcdn.com', 'p9-sign-sg.tiktokcdn.com'],
        dangerouslyAllowSVG: true,
    },
};

module.exports = nextConfig;
