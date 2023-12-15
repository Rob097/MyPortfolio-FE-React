const withBuilderDevTools = require("@builder.io/dev-tools/next")();

/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = withBuilderDevTools({
  i18n,
  reactStrictMode: true,
  transpilePackages: ["@mui/x-charts"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
});

module.exports = nextConfig;
