"use client";

import Image from "next/image";
import botIcon from "@/assets/Images/bot_icon.png";
import userIcon from "@/assets/Images/user_icon.png";
import { Message } from "ai";
import { UseChatHelpers } from "ai/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface ChatMessageProps
  extends Pick<UseChatHelpers, "append" | "setInput"> {
  message: Message;
  setInput: UseChatHelpers["setInput"];
  id?: string;
  index?: number;
  messagesLength?: number;
  isLoading?: boolean;
  doubtSolveStatus?: boolean;
}
export default function ChatMessage({
  message,
  isLoading,
  doubtSolveStatus,
}: ChatMessageProps) {
  const router = useRouter();
  return (
    <div className="flex-1 relative w-full">
      <div className="flex w-full justify-start gap-x-2 mt-4">
        <div className="bg-white border border-orange-200 w-10 h-10 rounded-full grid place-items-center">
          {message.role === "user" ? (
            <Image src={userIcon} alt="user" className="stroke-white" />
          ) : (
            <Image src={botIcon} alt="user" className="stroke-orange-300" />
          )}
        </div>
        <div
          className={cn(
            message.role === "user"
              ? "w-fit grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-5 border-[#F9F4EC] text-[#5B8989] bg-[#F9F4EC] p-4 rounded-lg rounded-ss-none whitespace-pre-wrap"
              : "w-fit grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-5 border-[#F0F6FA] text-[#5B8989] bg-[#F0F6FA] p-4 rounded-lg rounded-ss-none whitespace-pre-wrap"
          )}
        >
          {message.role === "user"
            ? message.content
            : (() => {
                try {
                  // if (doubtSolveStatus) return "Your doubt is solved";
                  const parsedContent = JSON.parse(message.content);
                  return parsedContent.answer || "Sorry, can't answer this!";
                } catch (error) {
                  if (isLoading) return "Loading...";
                }
              })()}
        </div>
      </div>
    </div>
  );
}
