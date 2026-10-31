import type { Metadata } from "next";
import "./designs.css";

export const metadata: Metadata = {
  title: "8 direções de design — QRLabs 3D",
  robots: { index: false, follow: false },
};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
