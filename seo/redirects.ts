import type { NextConfig } from "next";

// Derived from the public NextConfig type rather than reaching into
// next/dist/lib/load-custom-routes, which is an internal path.
type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];

/**
 * 301 map from the legacy PHP site to the current App Router routes.
 *
 * Source of truth: the "Top pages" Search Console export (Jan 1 - Jun 10 2026).
 * Click counts are kept inline so the highest-traffic entries stay obvious when
 * pruning this list later.
 *
 * Three rules govern every entry here:
 *  - Sources carry no trailing slash. Next normalises "/delhi/" to "/delhi" with
 *    a 308 *before* redirects are matched, so a trailing-slash source never fires.
 *  - No entry may have source === destination. The export lists already-migrated
 *    URLs (notably "/"), and copying those through verbatim self-redirects forever.
 *  - Sources never contain a fragment. Browsers strip "#..." before the request,
 *    so "/#services" is unmatchable server-side.
 *
 * statusCode 301 is set explicitly: `permanent: true` emits 308, not 301.
 */

// Legacy service, city and policy pages.
const pageRedirects: Redirect[] = [
  { source: "/delhi/veterinary-doctor.php", destination: "/veterinary-doctor", statusCode: 301 }, // 1476 clicks
  { source: "/veterinary-doctor.php", destination: "/veterinary-doctor", statusCode: 301 }, // 878 clicks
  { source: "/delhi/at-home-pet-vaccination.php", destination: "/pet-vaccinations", statusCode: 301 }, // 702 clicks
  { source: "/delhi", destination: "/deepet-services-delhi", statusCode: 301 }, // 655 clicks
  { source: "/gurgaon/pet-grooming-services.php", destination: "/deepet-services-gurgaon", statusCode: 301 }, // 272 clicks
  { source: "/gurgaon/veterinary-doctor.php", destination: "/deepet-services-gurgaon", statusCode: 301 }, // 255 clicks
  { source: "/delhi/pet-boarding-services.php", destination: "/pet-boarding", statusCode: 301 }, // 250 clicks
  { source: "/gurgaon", destination: "/deepet-services-gurgaon", statusCode: 301 }, // 239 clicks
  { source: "/pet-vaccinations.php", destination: "/pet-vaccinations", statusCode: 301 }, // 167 clicks
  { source: "/gurgaon/at-home-pet-vaccination.php", destination: "/deepet-services-gurgaon", statusCode: 301 }, // 167 clicks
  { source: "/noida/veterinary-doctor.php", destination: "/deepet-services-noida", statusCode: 301 }, // 150 clicks
  { source: "/online-vet-consultation.php", destination: "/online-vet-consultation", statusCode: 301 }, // 134 clicks
  { source: "/noida", destination: "/deepet-services-noida", statusCode: 301 }, // 120 clicks
  { source: "/faridabad", destination: "/services", statusCode: 301 }, // 119 clicks
  { source: "/ghaziabad", destination: "/deepet-services-ghaziabad", statusCode: 301 }, // 97 clicks
  { source: "/dog-walking.php", destination: "/services", statusCode: 301 }, // 94 clicks
  { source: "/noida/at-home-pet-vaccination.php", destination: "/pet-vaccinations", statusCode: 301 }, // 93 clicks
  { source: "/pet-surgery.php", destination: "/pet-surgery", statusCode: 301 }, // 92 clicks
  { source: "/noida/dog-training-services.php", destination: "/deepet-services-noida", statusCode: 301 }, // 89 clicks
  { source: "/delhi/dog-walking-services.php", destination: "/deepet-services-delhi", statusCode: 301 }, // 77 clicks
  { source: "/faridabad/pet-grooming-services.php", destination: "/#services", statusCode: 301 }, // 63 clicks
  { source: "/delhi/pet-grooming-services.php", destination: "/#services", statusCode: 301 }, // 57 clicks
  { source: "/gurgaon/dog-training-services.php", destination: "/pet-training", statusCode: 301 }, // 36 clicks
  { source: "/delhi/dog-training-services.php", destination: "/pet-training", statusCode: 301 }, // 36 clicks
  { source: "/gurgaon/pet-boarding-services.php", destination: "/#services", statusCode: 301 }, // 32 clicks
  { source: "/pet-grooming.php", destination: "/#services", statusCode: 301 }, // 32 clicks
  { source: "/contact-us.php", destination: "/contact", statusCode: 301 }, // 30 clicks
  { source: "/pet-training.php", destination: "/pet-training", statusCode: 301 }, // 29 clicks
  { source: "/pet-boarding.php", destination: "/pet-boarding", statusCode: 301 }, // 15 clicks
  { source: "/about-us.php", destination: "/about", statusCode: 301 }, // 12 clicks
  { source: "/ghaziabad/pet-grooming-services.php", destination: "/deepet-services-ghaziabad", statusCode: 301 }, // 10 clicks
  { source: "/faridabad/dog-training-services.php", destination: "/pet-training", statusCode: 301 }, // 8 clicks
  { source: "/price.php", destination: "/pricing", statusCode: 301 }, // 7 clicks
  { source: "/cat-vaccination-services.php", destination: "/blog/complete-pet-vaccination-guide-2026-rabies-booster-dose-cat-vaccination-at-home-in-delhi-ncr", statusCode: 301 }, // 6 clicks
  { source: "/dog-grooming-services.php", destination: "/#services", statusCode: 301 }, // 5 clicks
  { source: "/services.php", destination: "/services", statusCode: 301 }, // 3 clicks
  { source: "/noida/pet-grooming-services.php", destination: "/#services", statusCode: 301 }, // 2 clicks
  { source: "/noida/dog-walking-services.php", destination: "/deepet-services-noida", statusCode: 301 }, // 1 clicks
  { source: "/gallery.php", destination: "/gallery", statusCode: 301 },
  { source: "/delhi/dog-boarding-services-dwarka.php", destination: "/pet-boarding", statusCode: 301 },
  { source: "/terms-conditions.php", destination: "/terms-service", statusCode: 301 },
  { source: "/refund-policy.php", destination: "/privacy-policy", statusCode: 301 },
  { source: "/privacy-policy.php", destination: "/privacy-policy", statusCode: 301 },
];

// Legacy blog posts. Slugs were rewritten wholesale during the migration, so
// every post needs an explicit pairing - there is no derivable pattern.
const blogRedirects: Redirect[] = [
  { source: "/blog/indian-dog-names-for-male-and-female.php", destination: "/blog/400-best-dog-names-in-india-for-male-and-female", statusCode: 301 }, // 3012 clicks
  { source: "/blog/dog-breeds-banned.php", destination: "/blog/dog-breed-banned-in-india-full-list-best-alternatives", statusCode: 301 }, // 2475 clicks
  { source: "/blog/pet-health-certificate-for-travel-in-india.php", destination: "/blog/get-in-house-pet-health-certificate-for-travel-in-india", statusCode: 301 }, // 1114 clicks
  { source: "/blog/dog-and-puppy-vaccination-price.php", destination: "/blog/a-guide-to-dog-and-puppy-vaccination-price-in-india", statusCode: 301 }, // 665 clicks
  { source: "/blog/dog-broken-leg-treatment.php", destination: "/blog/dog-fractured-leg-treatment-connect-with-best-vet-surgeon-dog-broken-leg-treatment-signs-cost-recovery", statusCode: 301 }, // 103 clicks
  { source: "/blog/cat-names-for-male-and-female.php", destination: "/blog/150-cat-names-for-male-female-that-every-pet-parent-loves-best-cat-names-for-male-female", statusCode: 301 }, // 94 clicks
  { source: "/blog/dog-vomiting.php", destination: "/blog/dog-vomiting-explained-causes-types-proven-home-and-vet-treatment", statusCode: 301 }, // 76 clicks
  { source: "/blog/dog-health-checkup.php", destination: "/blog/dog-health-checkup-service-for-all-ages-breeds-delhi-ncr", statusCode: 301 }, // 73 clicks
  { source: "/blog/dog-and-pappy-vaccination-schedule-guide.php", destination: "/blog/dog-puppy-vaccination-schedule-for-all-breeds", statusCode: 301 }, // 29 clicks
  { source: "/blog/why-pet-grooming-is-important.php", destination: "/blog/why-pet-grooming-is-important-and-its-10-major-advantages", statusCode: 301 }, // 3 clicks
  { source: "/blog/how-to-find-trusted-nearby-vet-for-your-dogs-and-cats.php", destination: "/blog/how-to-find-trusted-nearby-vet-in-delhi-ncr-how-to-find-a-trusted-nearby-vet-for-your-dogs-and-cats", statusCode: 301 },
  { source: "/blog/what-does-a-regular-dog-health-check-includes.php", destination: "/blog/what-does-a-dog-health-check-include-what-does-a-dog-health-check-include", statusCode: 301 },
  { source: "/blog.php", destination: "/blog", statusCode: 301 },
  { source: "/blogs/posts/banned-dog-breeds", destination: "/blog/dog-breed-banned-in-india-full-list-best-alternatives", statusCode: 301 },
];

export const legacyRedirects: Redirect[] = [...pageRedirects, ...blogRedirects];
