import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link Keeper",
  description: "designed for easy link saving",
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
