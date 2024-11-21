"use client";
import React, { useEffect, useState } from "react";
import sandboxLogo from "@/assets/Images/sandboxLogo.svg";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setShowBackButton(true);
    } else {
      setShowBackButton(false);
    }
  }, [pathname]);

  const handleBackClick = () => {
    if (pathname.includes("student-dashboard")) {
      router.push("/");
    } else if (pathname.includes("subject-dashboard")) {
      router.push("/student-dashboard");
    } else if (pathname.includes("gk-quiz")) {
      router.push("/");
    } else if (pathname.includes("/quiz/")) {
      const subjectName = pathname.split("/")[2];
      router.push(
        `/subject-dashboard?subject=${
          subjectName == "math" ? "mathematics" : subjectName
        }`
      );
    } else if (pathname.includes("chat-bot/")) {
      router.push("/chat-bot");
    } else if (pathname.includes("chat-bot")) {
      router.push("/");
    } else if (
      pathname.includes("languages/result") ||
      pathname.includes("languages/quiz") ||
      pathname.includes("languages/learn")
    ) {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get("lang");
      if (langParam) {
        router.push(`/languages?lang=${langParam}`);
      } else {
        router.push("/student-dashboard");
      }
    } else if (pathname.includes("languages")) {
      router.push("/student-dashboard");
    } else {
      router.back();
    }
  };

  return (
    <div
      className={`${inter.variable} font-sans h-full w-full bg-[#FFF] z-100`}
    >
      <div className="w-full border-b-2 flex items-center justify-between bg-[#FFF] py-4 sticky top-0">
        {showBackButton && (
          <button
            onClick={handleBackClick}
            className="absolute left-0 md:ml-6 xs:ml-5 lg:text-sm md:text-xs font-bold leading-tight 
            text-left text-[#569090] flex flex-row justify-center items-center lg:hover:bg-[#FFF] xs:hover:bg-[#f2f7f7] p-2 rounded-full"
          >
            <Image
              src={"/images/icons/arrow-left.svg"}
              alt="arrow-left"
              width={16}
              height={16}
              className="md:mb-[0.5px] lg:mr-2 md:mr-1 lg:w-[16px] lg:h-[16px] md:w-[15px] md:h-[15px] xs:w-[16px] xs:h-[16px]"
            />
            <span className="xs:hidden md:block">Go Back</span>
          </button>
        )}
        <Link href="/" className="mx-auto">
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
