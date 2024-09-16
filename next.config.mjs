/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apid.c4m.mg",
        port: "",
        pathname: "/ticket-place-app/public/storage/event/image/**",
      },
    ],
  },
  reactStrictMode: false, // Désactive le mode strict
};

export default nextConfig;
