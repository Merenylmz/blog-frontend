/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "standalone",
    env: {
        apiLink: "http://localhost:8181/api",
        imageLink: "http://localhost:8181/storage"
    }
};

export default nextConfig;

