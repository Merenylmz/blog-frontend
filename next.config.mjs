/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "standalone",
    env: {
        apiLink: "http://host.docker.internal:8181/api",
        imageLink: "http://host.docker.internal:8181/storage"
    },
    images: {
        unoptimized: true
    }
};

export default nextConfig;

