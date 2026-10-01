import type { NextConfig } from "next";

// Product & banner images are served by the API (uploads + seeded images).
const api = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api");
const isLocalApi = ["localhost", "127.0.0.1"].includes(api.hostname);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: api.protocol.replace(":", "") as "http" | "https", hostname: api.hostname, port: api.port, pathname: "/uploads/**" }],
    // Next 16 refuses to optimize images from local IPs by default; allow it only when the API itself is local.
    dangerouslyAllowLocalIP: isLocalApi,
  },
};

export default nextConfig;
