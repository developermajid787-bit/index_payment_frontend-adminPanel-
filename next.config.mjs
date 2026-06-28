/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/default",
        permanent: false,
      },
    ];
  },
  allowedDevOrigins: ["https://3000-index-payment-index-paym-63gacrcpkx.app.codeanywhere.com"]
};

export default nextConfig;
