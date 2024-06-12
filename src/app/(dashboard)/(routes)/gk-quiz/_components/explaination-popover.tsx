"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BadgeInfo } from "lucide-react";
import { useCompletion } from "ai/react";

export default function ExplainationPopover({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const { completion, complete } = useCompletion({
    api: "/api/explain-bot",
    body: {
      correctOption: answer,
    },
  });
  return (
    <Popover>
      <PopoverTrigger className="absolute -top-2 -right-2 cursor-pointer">
        <div
          onClick={() => complete(question)}
          className="w-6 h-6 rounded-full grid place-items-center bg-orange-300"
        >
          <BadgeInfo className="stroke-white" size={18} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="text-sm max-w-lg">{completion}</PopoverContent>
    </Popover>
  );
}
