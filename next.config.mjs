/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GEMINI_MODEL: process.env.GEMINI_MODEL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
