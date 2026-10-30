This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Business Context

See [BUSINESS_CONTEXT.md](./BUSINESS_CONTEXT.md) for the QRLabs 3D business brief, website goals, WhatsApp contact, and content guidance.

See [DESIGN_DIRECTION.md](./DESIGN_DIRECTION.md) for the current visual direction, interaction and content decisions, rejected explorations, and the provisional gallery layout.

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

## Getting Started

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
