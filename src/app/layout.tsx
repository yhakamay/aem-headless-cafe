import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AEM Headless Cafe",
  description: "AEM Headless sample site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script
        src={
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_ADOBE_TAG_PROD
            : process.env.NEXT_PUBLIC_ADOBE_TAG_DEV
        }
        async
      />
    </html>
  );
}
