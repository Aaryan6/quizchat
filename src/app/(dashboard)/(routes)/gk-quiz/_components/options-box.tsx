"use client";

import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ExplainationPopover from "./explaination-popover";

export default function OptionsBox({
  options,
  handleNext,
  completedQuestion,
  question,
  answer,
}: {
  options: any;
  handleNext: any;
  completedQuestion: any;
  question: string;
  answer: string;
}) {
  const handleOptionClick = (index: number) => {
    if (completedQuestion) {
      return;
    }
    handleNext(index);
  };

  const alphabet = ["A", "B", "C", "D"];

  return (
    <div className="space-y-2 mt-2">
      <div className="grid grid-cols-2 gap-2">
        {options.map((option: any, i: number) => (
          <button
            type="button"
            key={i}
            onClick={() => handleOptionClick(i)}
            className={cn(
              "flex relative items-center gap-2 p-2 rounded-lg border-2 font-medium text-sm leading-5 border-[#DAE7E7] text-[#5B8989] bg-[#F9FBFB] cursor-pointer transition-all",
              completedQuestion?.selected.text === option.text &&
                option.correct === "true"
                ? "bg-[#70C29C] text-[#FFF]"
                : completedQuestion?.selected.text === option.text &&
                  option.correct === "false"
                ? "bg-[#E88272] text-[#FFF]"
                : ""
            )}
          >
            <div
              className={cn(
                "rounded-full bg-[#E6EFEF] w-6 h-6 flex items-center justify-center text-sm font-semibold",
                completedQuestion?.selected.text === option.text &&
                  option.correct === "true"
                  ? "bg-[#9BD4B6] text-[#FFF]"
                  : completedQuestion?.selected.text === option.text &&
                    option.correct === "false"
                  ? "bg-[#F1B1A7] text-[#FFF]"
                  : ""
              )}
            >
              {option.correct === "true" &&
              completedQuestion?.selected.text === option.text ? (
                <DoneOutlinedIcon fontSize="small" />
              ) : option.correct === "false" &&
                completedQuestion?.selected.text === option.text ? (
                <CloseOutlinedIcon fontSize="small" />
              ) : (
                alphabet[i]
              )}
            </div>
            <p className="text-sm">{option.text}</p>
            {completedQuestion?.selected.text === option.text &&
              option.correct === "false" && (
                <ExplainationPopover question={question} answer={answer} />
              )}
          </button>
        ))}
      </div>
    </div>
  );
}
