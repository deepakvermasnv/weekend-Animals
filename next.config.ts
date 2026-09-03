import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const rawBackendUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    let backendUrl = rawBackendUrl.trim().replace(/\/+$/, '');
    if (backendUrl.endsWith('/api')) {
      backendUrl = backendUrl.substring(0, backendUrl.length - 4);
    }
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
