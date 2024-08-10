import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/app/hooks/useApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SVG 2 React",
  description: "Convert SVGs to React components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProvider>
        <body className={inter.className}>{children}</body>
      </AppProvider>
    </html>
  );
}
