# Firebase: how the site stores its data

There is no WordPress and no Neon database any more. Everything is stored in Firebase project **deepets-62d01** and edited from **/admin**.

| Admin tab | What it edits | Firestore |
|---|---|---|
| Consultations / Contacts | Bookings and enquiries from the website forms | `leads`, `counters/leads` |
| Blogs | Blog posts, featured images, categories, tags, per-post SEO | `posts` |
| Gallery | Gallery photos, captions, order | `gallery` |
| Website Info | Address, email, phones, social links, logos, favicon, GTM ID, robots.txt, llms.txt | `config/site` |
| Pages | Privacy Policy and Terms of Service | `pages` |
| SEO | Google title, description, share image, hide-from-Google option and structured data for every page | `seo` |
| Email / Google Sheet / Password | Where booking notifications go, the Sheet webhook, the admin login | `config/admin` |

Images are stored in Firebase Storage (`deepets-62d01.firebasestorage.app`).

The sitemap (`/sitemap.xml`) is built automatically from published blog posts and from the pages in `lib/cms/sitePages.ts`. A page marked "Hide from Google" in the SEO tab is left out.

## Environment variables (`.env.local` locally, and the same on Vercel)

```
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
FIREBASE_STORAGE_BUCKET
ADMIN_SESSION_SECRET
```

Plus the existing reCAPTCHA and Mailjet keys. See `.env.example`.

## Going live

1. Add the variables above to Vercel, **before** deploying.
2. Deploy.
3. Copy any bookings that reached Neon before the switch:
   ```bash
   node --env-file=.env.local --env-file=../deepet-main/.env.local scripts/sync-neon-leads.mjs
   ```
4. Change the admin password (Admin → Password).
5. In Firebase → Project settings → Service accounts, generate a new key, update it on Vercel and in `.env.local`, then delete the old key.
6. Then you can shut down the Neon database and the old WordPress site, and delete `scripts/sync-neon-leads.mjs`.

## Adding a new page to the site

Add one line to `lib/cms/sitePages.ts` and use `<SeoHead uri="your-page-id" />` in the page. The page then appears in Admin → SEO and in the sitemap.
