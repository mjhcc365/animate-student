import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["mew.xyz", "www.datocms-assets.com"], // 在这里添加你的域名
  },
  experimental: {
    turbo: {
      rules: {
        "*.{glsl,vs,fs,vert,frag}": {
          loaders: ["raw-loader"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
