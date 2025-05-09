import React from "react";
import { Inter } from "next/font/google";
import Header from "@/components/header/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const MentorLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${inter.variable} font-sans h-full w-full bg-[#FFF]`}>
      <div>
        <Header />
      </div>
      <main className="mt-[1rem]  bg-[#FFF] overflow-y-auto">{children}</main>
    </div>
  );
};

export default MentorLayout;
