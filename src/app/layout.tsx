import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Document Summarizer",
  description: "Upload documents and get AI-powered summaries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
