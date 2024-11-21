import { UseChatHelpers } from "ai/react";
import stars_icon from "@/assets/Images/stars_icon.png";
import Image from "next/image";

export interface ChatMessageProps extends Pick<UseChatHelpers, "setInput"> {
  setInput: UseChatHelpers["setInput"];
  id?: string;
  ques: any;
  onSubmit: (value: string) => Promise<void>;
}

export default function SuggestedQuestionForm({
  ques,
  setInput,
  onSubmit,
}: ChatMessageProps) {
  return (
    <form
      className="h-full w-full"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!ques.question?.trim()) {
          return;
        }
        setInput("");
        await onSubmit(ques.question);
      }}
    >
      <button
        type="submit"
        className="flex items-center w-full h-full cursor-pointer rounded-md border border-[#E4E2DC] bg-[#F6F5F4] px-3 py-2 text-sm text-[#5B8989] hover:bg-[#E4E2DC]"
      >
        <div className="mr-1">
          <Image src={stars_icon} alt="" />
        </div>
        <div className="text-left ml-2">{ques.question}</div>
      </button>
    </form>
  );
}
