import type { MetadataRoute } from "next";
import { isPreviewDeployment, site } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreviewDeployment) return [];

  return [
    {
      url: `${site.url}/`,
      images: ["cogumelo", "miniatura", "display-qr"].map(
        (image) => `${site.url}/images/${image}.jpg`,
      ),
    },
  ];
}
