import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QRLabs 3D — Da sua ideia. Do seu jeitinho.",
  description:
    "Impressão 3D personalizada em Recife. Conheça as criações da QRLabs 3D e converse com a gente pelo WhatsApp sobre sua próxima ideia.",
  openGraph: {
    title: "QRLabs 3D — Da sua ideia. Do seu jeitinho.",
    description:
      "Ideias com forma, cor e afeto. Impressão 3D personalizada em Recife.",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
