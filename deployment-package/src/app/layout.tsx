import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "سیستم قیمت‌گذاری الکترونیک",
  description: "سیستم مدیریت قیمت‌گذاری قطعات و دستگاه‌های الکترونیکی",
  robots: "index, follow",
  keywords: "الکترونیک, قیمت‌گذاری, قطعات, بردهای مدار چاپی, مدیریت انبار",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-gray-50 font-persian antialiased">
        <div id="root" className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
