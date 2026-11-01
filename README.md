This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Business Context

See [BUSINESS_CONTEXT.md](./BUSINESS_CONTEXT.md) for the QRLabs 3D business brief, website goals, WhatsApp contact, and content guidance.

See [DESIGN_DIRECTION.md](./DESIGN_DIRECTION.md) for the current visual direction, interaction and content decisions, rejected explorations, and the gallery layout.

## Website

The homepage is a Brazilian Portuguese portfolio and introduction to QRLabs 3D, with WhatsApp quotation links. It is statically rendered with Next.js and uses plain responsive CSS. A separately loaded Three.js scene animates the hero.

- Edit the content, portfolio entries, and contact links in `app/page.tsx`.
- Edit colors and responsive layouts in `app/globals.css`.
- Edit shared business details, the canonical domain, title, and description in `app/lib/site.ts`; metadata is applied in `app/layout.tsx` and `app/page.tsx`.
- Edit the stylized A1 + AMS Lite model and printing cycle in `app/components/printer-scene.ts`; playback, reduced motion, and loading visibility are handled in `app/components/printer-hero.tsx`.
- Local Instagram images and their source references are in `public/images/`.
- `npm run build` verifies the production build and TypeScript.

All project photos are genuine public Instagram posts. The circular Instagram highlight required login and was not used. New portfolio photos can be added locally without connecting the website to Instagram.

The hero is an original procedural 3D illustration of an A1 and AMS Lite printing a mushroom inspired by the gallery, not a CAD model or a recording of a real print. The scene fades in when ready, runs once, and stops with the finished mushroom. Playback pauses offscreen or in a hidden tab. Reduced-motion users see a finished still scene. The hero reserves space but stays empty until the scene is ready; no placeholder image appears during loading or when JavaScript or WebGL is unavailable. The scene uses no external model or texture downloads.

## SEO audit — October 31, 2026

The target is people in Recife looking for custom physical items, including visitors who do not yet know that 3D printing can make their idea. Primary wording: **impressão 3D personalizada em Recife**. Supporting topics: **presentes personalizados**, **miniaturas**, **decoração personalizada**, and **displays com QR code**. These are content priorities grounded in the existing portfolio, not measured keyword-volume estimates. Lembrancinhas are an invitation to discuss a project, not an established product line or minimum-order promise.

The audit covered repository code, a production build, the public Vercel homepage, Vercel domain configuration, and desktop/mobile browser checks. Search Console, Google Business Profile, organic traffic, backlinks, and real-user Core Web Vitals were not available for this audit. No ranking or traffic improvement has been measured yet.

| Finding | Resolution / status |
| --- | --- |
| The title and H1 led with the slogan rather than the service and city. | Added a service-and-city title and visible H1; preserved the large brand slogan and printer composition. |
| Broad copy gave little detail about what people can order. | Added portfolio-specific descriptions and five server-rendered ordering FAQs, with no invented prices, turnaround, materials, or fulfillment guarantees. |
| No explicit canonical URL or metadata base. | Set the preferred custom domain, homepage canonical, Open Graph URL, and consistent social titles/descriptions. |
| No sitemap or robots file. | Added `/sitemap.xml` with the homepage and three genuine project images, plus `/robots.txt` linking to it. No fabricated modification dates. |
| No machine-readable business identity. | Added connected Organization, WebSite, and Service JSON-LD with the confirmed city, phone, Instagram, and WhatsApp contact. |
| No application-level preview indexing policy. | Vercel preview/development builds emit `noindex, nofollow` and omit sitemap entries; crawlers can still read the noindex directive. |
| Hero loading briefly displayed a mushroom photo. | Removed the placeholder; the reserved area stays empty until the printer scene fades in. |
| Brand spelling differed in the founder caption. | Corrected it to QRLabs 3D. |
| Custom domain does not resolve. | **External blocker:** Vercel reported `misconfigured: true`, external nameservers, and no A/CNAME values. See the DNS fix below. |
| Both the custom and Vercel domains are attached without a redirect. | Canonical tags are prepared. Once the custom domain works, configure a permanent redirect from the Vercel alias to consolidate public entry points. |

The site remains one statically generated page with real portfolio examples. Separate category pages should wait until there is enough distinct, confirmed content and genuine work for each category. Organization markup uses only the confirmed city-level address; a public street address, opening hours, delivery area, ratings, and prices have not been established. No Product offer or FAQ rich-result eligibility is claimed. See [Google's structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/organization) and [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

### Custom-domain DNS fix required before release

`https://qrlabs3d.vercel.app/` returned HTTP 200, but `qrlabs3d.com.br` failed DNS resolution. Vercel confirms the custom domain is attached and verified; domain ownership verification does not mean traffic is routed correctly. Its authoritative nameservers were `a.auto.dns.br` and `b.auto.dns.br`, so the fix belongs at the external DNS provider, not in this repository or Vercel DNS.

At the DNS provider for `qrlabs3d.com.br`, configure the apex (`@`, or the blank host field) with the A records recommended by this project's Vercel domain configuration:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 216.150.1.1 |
| A | @ | 216.150.16.1 |

These values were read from Vercel on the audit date; recheck the project's domain settings before changing DNS later. Preserve unrelated MX/TXT records. After propagation, confirm the custom domain serves the homepage over HTTPS and Vercel reports a valid configuration. Then deploy these changes and verify the canonical, share image, sitemap, and all three sitemap images on the custom domain. Do not redirect the working Vercel URL to the custom domain until it resolves successfully.

### Search setup after release

1. Verify the custom domain in Google Search Console, submit `https://qrlabs3d.com.br/sitemap.xml`, and inspect the homepage URL. A sitemap helps discovery but does not guarantee indexing.
2. Create or verify an eligible Google Business Profile with the real business name, phone, website, genuine project photos, and accurate service area. Confirm customer-facing location/fulfillment details before adding an address or area. See [Google's business-details guidance](https://developers.google.com/search/docs/appearance/establish-business-details).
3. Link the canonical website from Instagram. Add genuine completed projects and request honest customer reviews as work is delivered.
4. Monitor Search Console impressions, queries, clicks, and indexing; compare organic visitors' `whatsapp_click` events in GA4. Track inquiries and paid orders separately from clicks. Use field data for Core Web Vitals once available.

Production build, TypeScript, ESLint, rendered metadata/JSON-LD, sitemap XML, HTTP 200/404 behavior, and a 360px mobile layout were checked locally. Browser console checks found no warnings or errors. FAQ answers are present in the initial HTML and use native disclosure controls. Canonical-domain availability, search-engine indexing, Google rich-result validation, and field performance require post-release verification.

## Google Analytics

GA4 uses the official [Next.js integration](https://nextjs.org/docs/app/guides/third-party-libraries#google-analytics), `@next/third-parties/google`. The root layout loads it once after hydration; pageviews are handled by GA4 rather than manually duplicated.

Copy `.env.example` to `.env.local` and set your web stream's measurement ID:

```dotenv
NEXT_PUBLIC_GA_ID=G-YOUR_MEASUREMENT_ID
NEXT_PUBLIC_GA_DEBUG=false
```

Set `NEXT_PUBLIC_GA_ID` in your hosting provider's production environment before building/deploying. Next.js embeds public environment variables at build time, so changing the ID requires a rebuild. With no ID, no Google Analytics scripts load and custom events do nothing. Local development tracking is off unless `NEXT_PUBLIC_GA_DEBUG=true`; use a test GA4 property for local verification. Leave debug mode false in production.

| Event | Trigger | Parameters |
| --- | --- | --- |
| `page_view` | GA4 automatic pageview measurement | GA4 defaults |
| `whatsapp_click` | Quote buttons and footer WhatsApp link | `location`: `hero`, `contact`, or `footer` |
| `instagram_click` | Instagram profile links | `location`: `portfolio`, `about`, or `footer` |
| `select_content` | Portfolio card links | `location`: `portfolio`, `content_type`: `project`, `content_id`, `content_name` |

Custom click events support normal, keyboard, modifier, and middle clicks without delaying navigation. Their payloads contain only the placement and public project identifiers/names, not the WhatsApp number, message text, or destination URL. A WhatsApp click measures contact intent, not a confirmed conversation or sale.

In your GA4 property:

1. Enable Enhanced Measurement, including pageviews and browser history changes. Its built-in `click` and `scroll` events are separate from the custom events above.
2. Create event-scoped [custom dimensions](https://support.google.com/analytics/answer/14239696) for `location`, `content_id`, and `content_name` to compare placements and projects in reports.
3. If contact intent is your conversion goal, mark `whatsapp_click` as a key event.
4. For verification, set `NEXT_PUBLIC_GA_DEBUG=true`, restart the development server, and check GA4 DebugView while clicking each tracked link. Confirm one custom event per activation with the expected parameters. Disable debug mode afterward. Collection in GA4 can only be verified once a real measurement ID is configured.

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

The design uses system sans-serif and serif fonts, so it does not require external font requests.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
