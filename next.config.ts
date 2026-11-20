import type { NextConfig } from "next";
import path from "path";
import { legacyRedirects } from "./seo/redirects";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        // Blog, gallery and logo images uploaded to Firebase Storage.
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  async redirects() {
    return [
      // Location pages moved from /location/<city> to /deepet-services-<city>.
      // 301 so any indexed/old links carry over.
      { source: "/location/:city", destination: "/deepet-services-:city", permanent: true },
      // Legacy PHP site -> App Router. See seo/redirects.ts.
      ...legacyRedirects,
    ];
  },
  async rewrites() {
    return [
      // /sitemap.xml is a reserved Next.js metadata-route URL — a regular
      // route handler there gets routed through the metadata pipeline and
      // 500s. Host the parent sitemap index under /api/sitemap and rewrite
      // the public URL onto it.
      { source: "/sitemap.xml", destination: "/api/sitemap" },
    ];
  },
  async headers() {
    return [
      {
        // Force the correct XSLT MIME type for the public stylesheet. Next's
        // static-file MIME map serves .xsl as a generic application/xml, which
        // some browsers refuse to apply as a stylesheet. application/xslt+xml
        // is the official IANA type.
        source: "/sitemap.xsl",
        headers: [
          { key: "content-type", value: "application/xslt+xml; charset=utf-8" },
        ],
      },
    ];
  },
};

export default nextConfig;
