/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/api/",
      },
      {
        source: "/:username",
        destination: "/api/:username",
      },
    ];
  },
};

module.exports = nextConfig;
