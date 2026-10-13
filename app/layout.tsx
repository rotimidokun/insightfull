import type { Metadata } from "next";
import { Amaranth, Inter } from "next/font/google";
import "./globals.css";

/* Exact families/weights from Figma: Amaranth Bold 700, Inter Bold 700 */
const amaranth = Amaranth({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-amaranth",
  display: "swap",
});

const inter = Inter({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Insightfull Creative",
  description:
    "Insightfull Creative — branding, web design, event design & production.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${amaranth.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
