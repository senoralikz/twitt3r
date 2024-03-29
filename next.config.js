/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "links.papareact.com",
                // port: "",
                // pathname: "/drq",
            },
            {
                protocol: "https",
                hostname: "i.imgur.com",
                // port: "",
                // pathname: "/drq",
            },
        ],
    },
};

module.exports = nextConfig;
