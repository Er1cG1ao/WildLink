/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*.(svg|gif|png|jpg|jpeg|css|js|woff2|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Cache for 1 year
          },
        ],
      },
    ];
  },
};

export default nextConfig;
