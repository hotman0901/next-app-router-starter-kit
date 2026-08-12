/** @type {import('next').NextConfig} */

const { withYak } = require('next-yak/withYak');

const rewrites = async () => {
  return [
    {
      source: '/api/proxy/:path*',
      destination: 'https://jsonplaceholder.typicode.com/:path*',
    },
  ];
};
const nextConfig = {
  experimental: {
    authInterrupts: true, // Enable the experimental feature
  },
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
  }
};

// next-yak 是 build-time transform，必須包在這裡才會編譯 styled 樣式
module.exports = withYak(nextConfig);
