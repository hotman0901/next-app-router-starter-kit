/** @type {import('next').NextConfig} */

const rewrites = async () => {
  return [
    {
      source: '/api/proxy/:path*',
      destination: 'https://jsonplaceholder.typicode.com/:path*',
    },
  ];
};
const nextConfig = {
  rewrites,
  // 必須增加這個設定才能 http 外部 url 的 image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
