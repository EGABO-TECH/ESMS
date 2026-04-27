import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { GlobalProvider } from "@/lib/GlobalContext";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "Enterprise School Management System",
  description: "Cavendish University Uganda Central Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable} font-sans antialiased`}>
        <GlobalProvider>
          {children}
          <Toaster richColors position="top-right" />
        </GlobalProvider>
      </body>
    </html>
  );
}
