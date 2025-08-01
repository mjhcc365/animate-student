import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["mew.xyz", "www.datocms-assets.com"], // 在这里添加你的域名
  },
  // webpack: (config) => {
  //   // 添加对 GLSL 文件的支持
  //   config.module.rules.push({
  //     test: /\.(glsl|vs|fs|vert|frag)$/,
  //     exclude: /node_modules/,
  //     use: ["raw-loader"],
  //   });

  //   return config;
  // },
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
