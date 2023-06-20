/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
                protocol: 'http',
             
            },
            {
                hostname: 'marconi-duo.s3.amazonaws.com',
                protocol: 'https',
             
            }
        ]
    }
}

module.exports = nextConfig
