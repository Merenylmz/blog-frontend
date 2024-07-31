/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "standalone",
    env: {
        // apiLink: "http://localhost:8181/api",
        // imageLink: "http://localhost:8181/storage"
    },
    images: {
        unoptimized: true
    }
};

export default nextConfig;

