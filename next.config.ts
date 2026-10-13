import type { NextConfig } from "next";

const config: NextConfig = {
  // Uploaded images come from Vercel Blob; plain <img> tags are used, so no image domains to list.
  poweredByHeader: false,
  // Allow image/CV uploads through server actions (default limit is 1 MB).
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
};

export default config;
