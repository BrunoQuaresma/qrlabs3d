import type { MetadataRoute } from "next";
import { isPreviewDeployment, site } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Crawlers must be able to read the noindex metadata on preview deployments.
    rules: { userAgent: "*", allow: "/" },
    sitemap: isPreviewDeployment ? undefined : `${site.url}/sitemap.xml`,
  };
}
