export const site = {
  name: "QRLabs 3D",
  url: "https://qrlabs3d.com.br",
  title: "Impressão 3D personalizada em Recife | QRLabs 3D",
  description:
    "Presentes personalizados, miniaturas, decoração e peças para sua marca com impressão 3D em Recife. Conte sua ideia e peça um orçamento à QRLabs 3D pelo WhatsApp.",
  instagram: "https://www.instagram.com/qrlabs3d/",
  telephone: "+5581982742579",
  whatsapp: `https://wa.me/5581982742579?text=${encodeURIComponent("Olá! Vim pelo site da QRLabs 3D e gostaria de um orçamento para um projeto personalizado.")}`,
};

export const isPreviewDeployment =
  process.env.VERCEL_ENV === "preview" ||
  process.env.VERCEL_ENV === "development";

export const businessStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      description: site.description,
      logo: `${site.url}/images/logo.jpg`,
      telephone: site.telephone,
      sameAs: [site.instagram],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Recife",
        addressRegion: "PE",
        addressCountry: "BR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Orçamentos pelo WhatsApp",
        telephone: site.telephone,
        url: site.whatsapp,
        availableLanguage: "pt-BR",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "pt-BR",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${site.url}/#impressao-3d`,
      name: "Impressão 3D personalizada em Recife",
      serviceType: "Impressão 3D personalizada",
      description: site.description,
      url: site.url,
      provider: { "@id": `${site.url}/#organization` },
    },
  ],
};
