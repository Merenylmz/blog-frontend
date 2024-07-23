/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        apiLink: "http://localhost:8181/api",
        imageLink: "http://localhost:8181/storage"
    }
};

export default nextConfig;

