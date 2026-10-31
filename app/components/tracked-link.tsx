"use client";

import { sendGAEvent } from "@next/third-parties/google";
import type { ComponentPropsWithoutRef } from "react";
import { analyticsEnabled } from "../lib/analytics";

type AnalyticsEvent =
  | {
      name: "whatsapp_click";
      params: { location: "hero" | "contact" | "footer" };
    }
  | {
      name: "instagram_click";
      params: { location: "portfolio" | "about" | "footer" };
    }
  | {
      name: "select_content";
      params: {
        content_type: "project";
        content_id: string;
        content_name: string;
        location: "portfolio";
      };
    };

type TrackedLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "onClick" | "onAuxClick"
> & { event: AnalyticsEvent };

export default function TrackedLink({ event, ...props }: TrackedLinkProps) {
  function trackClick() {
    if (analyticsEnabled) {
      sendGAEvent("event", event.name, event.params);
    }
  }

  return (
    <a
      {...props}
      onClick={trackClick}
      onAuxClick={(event) => {
        if (event.button === 1) trackClick();
      }}
    />
  );
}
