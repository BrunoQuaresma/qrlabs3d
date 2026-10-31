export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID?.trim();
export const gaDebugMode = process.env.NEXT_PUBLIC_GA_DEBUG === "true";
export const analyticsEnabled = Boolean(
  gaMeasurementId && (process.env.NODE_ENV === "production" || gaDebugMode),
);
