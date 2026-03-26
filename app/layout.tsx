import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURION — Production-Backed Trading",
  description: "AI-powered Bitcoin and gold trading platform. Powered by Ndeipi infrastructure rails and Migodi-Auric production.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
