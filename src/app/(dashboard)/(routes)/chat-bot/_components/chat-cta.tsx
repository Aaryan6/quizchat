import React, { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { useRouter } from "next/navigation";
import { doubtSolved } from "@/actions/chat-doubt";
import Link from "next/link";

type ChatMessageProps = {
  userId: string;
  chatId: string;
};

const ChatSolved = ({ chatId, userId }: ChatMessageProps) => {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await doubtSolved(userId, chatId);
    router.push("/chat-bot");
  };
  return (
    <div className="max-w-md px-10 py-2 space-y-2">
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-2 items-center">
        <form className="h-full w-full" onSubmit={onSubmit}>
          <button
            type="submit"
            className="flex items-center max-w-52 h-full cursor-pointer rounded-md border border-[#5B8989] bg-[#F0F6FA] px-3 py-2 text-sm text-[#5B8989] hover:bg-[#F0F6FA]"
          >
            My doubt is solved{" "}
            <DoneOutlinedIcon fontSize="small" className="ml-1" />{" "}
          </button>
        </form>
        <Link href={"/chat-bot"} target="_blank">
          <Button
            variant={"link"}
            type="button"
            className="max-w-48 hover:no-underline border border-[#E98451] text-[#E98451] bg-[#F6F4F4] hover:bg-[#F6F4F4]"
          >
            Ask another doubt{" "}
            <ArrowOutwardIcon fontSize="small" className="ml-1" />{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ChatSolved;
