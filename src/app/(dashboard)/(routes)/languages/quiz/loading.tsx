"use client";

import { Loader2 } from "lucide-react";

export default function QuizLoading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="size-8 animate-spin text-[#5B8989]" />
    </div>
  );
}
