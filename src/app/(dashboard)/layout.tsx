import React from "react";
import sandboxLogo from "@/assets/Images/sandboxLogo.svg";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${inter.variable} font-sans h-full w-full bg-[#FFF]`}>
      <div className="w-full border-b-2 flex justify-center bg-[#FFF] py-4 sticky top-0">
        <Link href="/">
          <Image src={sandboxLogo} alt="sandbox-logo" />
        </Link>
      </div>
      <main className="mt-[1rem] h-[calc(100vh-90px)] bg-[#FFF] overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
