import React from "react";
import { Button } from "@/components/ui/button";
import { UseChatHelpers } from "ai/react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { useRouter } from "next/navigation";

export interface ChatMessageProps extends Pick<UseChatHelpers, "setInput"> {
  setInput: UseChatHelpers["setInput"];
  onSubmit: (value: string) => Promise<void>;
}

const ChatSolved = ({ setInput, onSubmit }: ChatMessageProps) => {
  const router = useRouter();
  const navigateTo = (action: string) => {
    if (action === "new-chat") {
      window.open(`${process.env.NEXT_PUBLIC_DOUBT_SOLVING_URL}/chat-home`);
    }
  };
  return (
    <div className="max-w-md px-10 py-2 space-y-2">
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-2 items-center">
        <form
          className="h-full w-full"
          onSubmit={async (e) => {
            e.preventDefault();
            setInput("");
            await onSubmit("My doubt is solved");
            router.push("/quizes")
          }}
        >
          <button
            type="submit"
            className="flex items-center max-w-52 h-full cursor-pointer rounded-md border border-[#5B8989] bg-[#F0F6FA] px-3 py-2 text-sm text-[#5B8989] hover:bg-[#F0F6FA]"
          >
            My doubt is solved{" "}
            <DoneOutlinedIcon fontSize="small" className="ml-1" />{" "}
          </button>
        </form>
        <Button
          onClick={() => navigateTo("new-chat")}
          className="max-w-48 border border-[#E98451] text-[#E98451] bg-[#F6F4F4] hover:bg-[#F6F4F4]"
        >
          Ask another doubt{" "}
          <ArrowOutwardIcon fontSize="small" className="ml-1" />{" "}
        </Button>
      </div>
    </div>
  );
};

export default ChatSolved;
