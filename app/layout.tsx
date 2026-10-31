import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { analyticsEnabled, gaDebugMode, gaMeasurementId } from "./lib/analytics";
import { isPreviewDeployment, site } from "./lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  robots: isPreviewDeployment
    ? { index: false, follow: false }
    : { index: true, follow: true, googleBot: { "max-image-preview": "large" } },
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>{children}</body>
      {analyticsEnabled && gaMeasurementId && (
        <GoogleAnalytics gaId={gaMeasurementId} debugMode={gaDebugMode} />
      )}
    </html>
  );
}
