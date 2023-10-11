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
};

module.exports = nextConfig;
