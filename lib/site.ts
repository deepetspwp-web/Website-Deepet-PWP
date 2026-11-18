// Canonical public origin for the frontend. Mirrors NEXT_PUBLIC_SITE_URL and
// the documented default. Used to anchor absolute URLs in the sitemap routes.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deepetservices.com"
).replace(/\/$/, "");

/** Join a path onto the public origin: siteUrl("/blog/") → https://deepetservices.com/blog/ */
export function siteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
