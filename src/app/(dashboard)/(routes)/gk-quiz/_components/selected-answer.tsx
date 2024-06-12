"use client";

import { User } from "lucide-react";
import Image from "next/image";
import userIcon from "@/assets/Images/user_icon.png";

export default function SelectedAnswer({
  submissions,
  index,
}: {
  submissions: any[];
  index: number;
}) {
  return (
    submissions[index] && (
      <div className="flex w-full justify-start gap-x-2 mt-4 mb-8">
        <div className="bg-white border border-orange-200 w-10 h-10 rounded-full grid place-items-center">
          <Image src={userIcon} alt="user" className="stroke-orange-300" />
        </div>
        <p className="border-2 font-medium text-center text-sm leading-5 border-[#DAE7E7] text-[#5B8989] bg-[#F9FBFB] px-4 py-1 rounded-md flex items-center w-fit rounded-ss-none">
          {submissions[index]?.selected?.text}
          {/* <span className="text-sm font-medium ml-1">: You</span> */}
        </p>
      </div>
    )
  );
}
