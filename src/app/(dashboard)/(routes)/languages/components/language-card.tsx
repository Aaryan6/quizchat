"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import LanguageImage from "@/public/images/icons/language-card.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LanguageCard({
  lang,
  langId,
  totalQuestions,
}: {
  lang: string;
  langId: number;
  totalQuestions: { id: number; language_id: number }[];
}) {
  const router = useRouter();
  const totalQuestionsCount = totalQuestions.filter(
    (item) => item.language_id === langId
  ).length;

  return (
    <div className="bg-[#F5F9FF] shadow-[0px_0px_8px_0px_#0053F429] p-8 rounded-xl max-w-xl w-full mx-auto my-10 flex items-center gap-8">
      <div className="shrink-0">
        <Image
          src={LanguageImage}
          alt="Language Image"
          className="md:w-[100px] md:h-[100px] w-[80px] h-[80px]"
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-[#5B8989] font-semibold text-lg">
          You have {totalQuestionsCount} sets of flashcards to practice
        </h1>
        <Button
          onClick={() => router.push("/languages?lang=" + lang + "#topics")}
          className="text-white bg-[#E98451] p-4 rounded-lg hover:bg-[#e69167]"
        >
          Get Started <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
