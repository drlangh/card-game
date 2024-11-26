/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // models available: 'gemini-1.5-pro', 'gemini-1.5-flash-8b', 'gemini-1.5-flash', 'aqa'
    GEMINI_MODEL: 'gemini-1.5-flash-8b',
    GEMINI_API_KEY: 'AIzaSyDmQjsg_wA33t3pCBupxSgzoXAYzouE3dU',
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
