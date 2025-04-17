import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    typescript: {
        // Temporarily bypass type checking during build
        ignoreBuildErrors: true,
    },
};

export default nextConfig;