import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import SupabaseProvider from "./supabase-provider";
import "./globals.css";
import Providers from "@/components/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sandbox",
  description: "AI powered quiz app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SupabaseProvider>
      <Providers>
        <html lang="en">
          <body className={poppins.className}>
            <main className="flex flex-col h-screen w-full">{children}</main>
          </body>
        </html>
      </Providers>
    </SupabaseProvider>
  );
}
