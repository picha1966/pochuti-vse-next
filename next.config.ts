import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pochutyvse.com.ua',
        pathname: '/wp-content/uploads/**',
      },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Sanity image CDN
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },

  async redirects() {
    return [
      // Redirect all /ru/* pages to Ukrainian versions
      {
        source: '/ru/:path*',
        destination: '/:path*',
        permanent: true,
      },

      // Old blog URLs (without /blog/ prefix) → new /blog/[slug]
      {
        source: '/%D1%81%D0%BB%D1%83%D1%85%D0%BE%D0%BF%D1%80%D0%BE%D1%82%D0%B5%D0%B7%D1%83%D0%B2%D0%B0%D0%BD-%D1%81%D0%BB%D1%83%D1%85%D0%BE%D0%B2%D1%96-%D0%B0%D0%BF%D0%B0%D1%80%D0%B0%D1%82%D0%B8',
        destination: '/blog/%D1%81%D0%BB%D1%83%D1%85%D0%BE%D0%BF%D1%80%D0%BE%D1%82%D0%B5%D0%B7%D1%83%D0%B2%D0%B0%D0%BD-%D1%81%D0%BB%D1%83%D1%85%D0%BE%D0%B2%D1%96-%D0%B0%D0%BF%D0%B0%D1%80%D0%B0%D1%82%D0%B8',
        permanent: true,
      },
      {
        source: '/%D0%B4%D0%B8%D1%82%D1%8F%D1%87%D0%B5-%D1%81%D0%BB%D1%83%D1%85%D0%BE%D0%BF%D1%80%D0%BE%D1%82%D0%B5%D0%B7%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F',
        destination: '/blog/%D0%B4%D0%B8%D1%82%D1%8F%D1%87%D0%B5-%D1%81%D0%BB%D1%83%D1%85%D0%BE%D0%BF%D1%80%D0%BE%D1%82%D0%B5%D0%B7%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F',
        permanent: true,
      },
      {
        source: '/%D0%B2%D0%BD%D1%83%D1%82%D1%80%D1%96%D1%88%D0%BD%D1%8C%D0%BE%D0%B2%D1%83%D1%88%D0%BD%D1%96-%D1%81%D0%BB%D1%83%D1%85%D0%BE%D0%B2%D1%96-%D0%B0%D0%BF%D0%B0%D1%80%D0%B0%D1%82%D0%B8',
        destination: '/blog/%D0%B2%D0%BD%D1%83%D1%82%D1%80%D1%96%D1%88%D0%BD%D1%8C%D0%BE%D0%B2%D1%83%D1%88%D0%BD%D1%96-%D1%81%D0%BB%D1%83%D1%85%D0%BE%D0%B2%D1%96-%D0%B0%D0%BF%D0%B0%D1%80%D0%B0%D1%82%D0%B8',
        permanent: true,
      },
      {
        source: '/%D1%89%D0%BE-%D1%82%D0%B0%D0%BA%D0%B5-%D0%BE%D1%82%D0%BE%D0%BB%D0%B0%D1%80%D0%B8%D0%BD%D0%B3%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F',
        destination: '/blog/%D1%89%D0%BE-%D1%82%D0%B0%D0%BA%D0%B5-%D0%BE%D1%82%D0%BE%D0%BB%D0%B0%D1%80%D0%B8%D0%BD%D0%B3%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F',
        permanent: true,
      },

      // Old shop URL
      {
        source: '/shop',
        destination: '/catalog',
        permanent: true,
      },

      // Old city landing pages → new clean URLs
      {
        source: '/%D0%B2%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F-%D1%81%D0%BB%D1%83%D1%85%D0%BE%D0%B2%D1%96-%D0%B0%D0%BF%D0%B0%D1%80%D0%B0%D1%82%D0%B8',
        destination: '/vinnytsia',
        permanent: true,
      },
      {
        source: '/%D1%85%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D1%8C%D0%BA%D0%B8%D0%B9-%D1%81%D0%BB%D1%83%D1%85%D0%BE%D0%B2%D1%96-%D0%B0%D0%BF%D0%B0%D1%80%D0%B0%D1%82%D0%B8',
        destination: '/khmelnytskyi',
        permanent: true,
      },

      // Old product URLs
      {
        source: '/product/:slug',
        destination: '/catalog/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
