This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Business Context

See [BUSINESS_CONTEXT.md](./BUSINESS_CONTEXT.md) for the QRLabs 3D business brief, website goals, WhatsApp contact, and content guidance.

See [DESIGN_DIRECTION.md](./DESIGN_DIRECTION.md) for the current visual direction, interaction and content decisions, rejected explorations, and the gallery layout.

## Website

The homepage is a Brazilian Portuguese portfolio and introduction to QRLabs 3D, with WhatsApp quotation links. It is statically rendered with Next.js and uses plain responsive CSS. A separately loaded Three.js scene animates the hero.

- Edit the content, portfolio entries, and contact links in `app/page.tsx`.
- Edit colors and responsive layouts in `app/globals.css`.
- Edit the page title and social metadata in `app/layout.tsx`.
- Edit the stylized A1 + AMS Lite model and printing cycle in `app/components/printer-scene.ts`; playback, reduced motion, and image fallback are handled in `app/components/printer-hero.tsx`.
- Local Instagram images and their source references are in `public/images/`.
- `npm run build` verifies the production build and TypeScript.

All project photos are genuine public Instagram posts. The circular Instagram highlight required login and was not used. New portfolio photos can be added locally without connecting the website to Instagram.

The hero is an original procedural 3D illustration of an A1 and AMS Lite printing a mushroom inspired by the gallery, not a CAD model or a recording of a real print. The scene fades in when ready, runs once, and stops with the finished mushroom. Playback pauses offscreen or in a hidden tab. Reduced-motion users see a finished still scene; browsers without WebGL retain the real mushroom photo. The scene uses no external model or texture downloads.

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
