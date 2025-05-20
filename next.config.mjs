/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  output: "standalone",
  env: {
    NEXT_PUBLIC_SITE_URL:'https://www.stonediscover.co.uk/',
    NEXT_PUBLIC_MAIN_API_URL:'https://stonediscoveruk-apibackend.onrender.com/api/frontend',
    NEXT_PUBLIC_PRODUCTS_API_URL:'https://stonediscoveruk-apibackend.onrender.com/api/frontend/products',
    NEXT_PUBLIC_PRODUCTS_DETAILS_API_URL:'https://stonediscoveruk-apibackend.onrender.com/api/frontend/productdetails',
    NEXT_PUBLIC_PRODUCT_CATEGORY_API_URL:'https://stonediscoveruk-apibackend.onrender.com/api/frontend/categories',
    // NEXT_PUBLIC_CATEGORY_CHILD_API_URL:'https://stonediscoveruk-apibackend.onrender.com/api/frontend/productscategory',
    NEXT_PUBLIC_DETSILS_URL:'https://stonediscoveruk-apibackend.onrender.com/api/frontend/categorydetails',
    NEXT_PUBLIC_IMAGE:'https://stonediscoveruk-apibackend.onrender.com/uploads',
    NEXT_PUBLIC_BLOG_API_URL:'https://stonediscoveruk-apibackend.onrender.com/api/frontend/blogs',
    NEXT_PUBLIC_BLOG_PREVIEW_API_URL:'https://stonediscoveruk-apibackend.onrender.com/api/frontend/blogs/preview',
    NEXT_PUBLIC_CATEGORY_API_URL:'https://stonediscoveruk-apibackend.onrender.com/api/frontend/blog/categories',
    NEXT_PUBLIC_AUTHOR_API_URL:'https://stonediscoveruk-apibackend.onrender.com/api/frontend/blog/authors',
    NEXT_PUBLIC_AUTHOR_BLOG_API_URL:'https://stonediscoveruk-apibackend.onrender.com/api/frontend/blogs/author/',
    NEXT_PUBLIC_BLOG_API_Image:'https://stonediscoveruk-apibackend.onrender.com/uploads',
    NEXT_PUBLIC_BLOG_API_Image_profilePics:'https://stonediscoveruk-apibackend.onrender.com/uploads'
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",  
        hostname: "stonediscoveruk-apibackend.onrender.com",
        port: "",
        pathname: "/**",
      },
    ],
    // domains: ['stonediscoveruk-apibackend.onrender.com'],
    deviceSizes: [320, 420, 768, 1024, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96],
  },

  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           // value: "public, max-age=31536000, immutable",
  //           value: "no-store, no-cache, must-revalidate, proxy-revalidate",
  //         },
  //       ],
  //     },
  //   ];
  // },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
