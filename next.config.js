/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export only for production builds (./out). In dev we keep the normal
  // server so the embedded Sanity Studio (/studio/*) keeps working locally.
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  images: {
    // Static export has no Node image optimizer, so serve images as-is.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      { hostname: "icons.duckduckgo.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "www.google.com" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
