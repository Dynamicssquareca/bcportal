/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  output: "standalone",
  env: {
    NEXT_PUBLIC_SITE_URL:'https://www.businesscentralpartners.com/',
    NEXT_PUBLIC_DETSILS_URL:'https://businesscentralapi.onrender.com/api/frontend/categorydetails',
    NEXT_PUBLIC_IMAGE:'https://businesscentralapi.onrender.com/uploads',
    NEXT_PUBLIC_BLOG_API_URL:'https://businesscentralapi.onrender.com/api/frontend/blogs',
     NEXT_PUBLIC_BLOG_DETAILS_API_URL:'https://businesscentralapi.onrender.com/api/frontend/blogs/',
    NEXT_PUBLIC_BLOG_PREVIEW_API_URL:'https://businesscentralapi.onrender.com/api/frontend/blogs/preview',
    NEXT_PUBLIC_CATEGORY_API_URL:'https://businesscentralapi.onrender.com/api/frontend/categories',
    NEXT_PUBLIC_CATEGORYDETAILS_API_URL:'https://businesscentralapi.onrender.com/api/frontend/categorydetails',
    NEXT_PUBLIC_AUTHOR_API_URL:'https://businesscentralapi.onrender.com/api/frontend/blog/authors',
    NEXT_PUBLIC_AUTHOR_BLOG_API_URL:'https://businesscentralapi.onrender.com/api/frontend/blogs/author/',
    NEXT_PUBLIC_BLOG_API_Image:'https://businesscentralapi.onrender.com/uploads',
    NEXT_PUBLIC_BLOG_API_Image_profilePics:'https://businesscentralapi.onrender.com/uploads'
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",  
        hostname: "www.businesscentralpartners.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",  
        hostname: "businesscentralapi.onrender.com",
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
