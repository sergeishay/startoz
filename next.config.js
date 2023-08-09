/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
    serverActions: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "platform-lookaside.fbsbx.com", "res.cloudinary.com"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
