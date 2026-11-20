import { getRobotsTxt } from "@/lib/cms";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://deepetservices.com";

export const revalidate = 600;

export async function GET(): Promise<Response> {
    const robots = await getRobotsTxt();
    const body =
        robots?.trim() ||
        `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\nDisallow: /thank-you\n\nSitemap: ${siteUrl}/sitemap.xml`;

    return new Response(body, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
