/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    FILE_DISPLAY_NAME: process.env.NEXT_PUBLIC_FILE_DISPLAY_NAME,
    FILE_URI: process.env.NEXT_PUBLIC_FILE_URI,
    MIME_TYPE: process.env.NEXT_PUBLIC_MIME_TYPE,
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
