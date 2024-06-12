import { type Message } from "ai";

import ChatMessage from "./chat-message";
import FeedBackForm from "./feedback-form";
import { UseChatHelpers } from "ai/react";
import ChatSolved from "./chat-cta";
import { doubtSolved } from "@/actions/chat-doubt";
import { useRouter } from "next/navigation";

export interface ChatList {
  messages: UseChatHelpers["messages"];
  setInput: UseChatHelpers["setInput"];
  append: UseChatHelpers["append"];
  chat_id: string;
  user_id: string;
  isLoading?: boolean;
  id?: string;
  setDoubtSolveStatus: any;
  doubtSolveStatus: boolean;
  onSubmit: (value: string) => Promise<void>;
}

export function ChatList({
  messages,
  chat_id,
  user_id,
  setInput,
  append,
  id,
  isLoading,
  setDoubtSolveStatus,
  doubtSolveStatus,
  onSubmit,
}: ChatList) {
  const router = useRouter();
  if (!messages.length) {
    return null;
  }
  return (
    <div className="relative mx-auto max-w-2xl px-4 space-y-8">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage
            message={message}
            messagesLength={messages.length}
            index={index}
            setInput={setInput}
            append={append}
            id={id}
            isLoading={isLoading}
            doubtSolveStatus={doubtSolveStatus}
          />
          {index == messages.length - 1 && message.role === "assistant" && (
            <div>
              {!doubtSolveStatus && (
                <FeedBackForm
                  key={index}
                  answerId={index + 1}
                  answer={message.content}
                  chat_id={chat_id}
                  user_id={user_id}
                />
              )}
              {!doubtSolveStatus && (
                <ChatSolved
                  setInput={setInput}
                  onSubmit={async (value) => {
                    await append({
                      id,
                      content: value,
                      role: "user",
                    });
                    setDoubtSolveStatus(true);
                    doubtSolved(user_id, chat_id);
                  }}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
