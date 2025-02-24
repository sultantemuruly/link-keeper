import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/custom/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/custom/Footer";

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
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
          <Toaster closeButton />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
