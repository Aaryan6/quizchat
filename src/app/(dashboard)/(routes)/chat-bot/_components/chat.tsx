"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import ion_send from "@/assets/Images/ion_send.png";
import stars_icon from "@/assets/Images/stars_icon.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { ChatList } from "./chat-list";
import { Message } from "ai";
import SuggestedQuestionForm from "./suggestion-form";
import useChatQuery from "@/store/chat-query";

type ChatProps = {
  id: string;
  user_id: string;
  initialMessages: Message[];
  doubtSolved: boolean;
};

export function Chat({ id, user_id, initialMessages, doubtSolved }: ChatProps) {
  const [suggestions, setSuggestions] = useState<[{ question: string }] | null>(
    null
  );
  const [doubtSolveStatus, setDoubtSolveStatus] =
    useState<boolean>(doubtSolved);
  const {
    messages,
    append,
    isLoading,
    input,
    handleSubmit,
    handleInputChange,
    setInput,
  } = useChat({
    initialMessages,
    id,
    body: {
      id,
      user_id,
    },
    async onResponse(response) {
      setSuggestions(null);
      if (response.status === 401) {
        console.log(response);
      }
    },
    onFinish(response) {
      setSuggestions(JSON.parse(response.content).nextPossibleQuestions);
    },
    api: "/api/chat-doubt",
  });
  const bottom = useRef<HTMLDivElement>(null);
  const chatQuery = useChatQuery((state) => state);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, suggestions]);

  useEffect(() => {
    if (messages.length === 0) {
      if (chatQuery.query) {
        append({
          role: "user",
          content: chatQuery.query,
        });
      }
    }

    if (
      suggestions == null &&
      messages[messages.length - 1]?.role === "assistant"
    ) {
      setSuggestions(
        JSON.parse(messages[messages.length - 1].content).nextPossibleQuestions
      );
    }
  }, [initialMessages]);

  return (
    <ScrollArea className="h-full w-full flex flex-col">
      <div className="flex-1 px-2 md:px-8">
        <div className="pb-4 max-w-4xl mx-auto h-full w-full">
          <ChatList
            messages={messages}
            chat_id={id}
            user_id={user_id}
            append={append}
            setInput={setInput}
            id={id}
            isLoading={isLoading}
            setDoubtSolveStatus={setDoubtSolveStatus}
            doubtSolveStatus={doubtSolveStatus}
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: "user",
              });
            }}
          />
        </div>
        {suggestions && !doubtSolveStatus && (
          <div className="flex items-center max-w-3xl w-full mx-auto mt-[2rem] mb-2 text-[#2F4F4F] text-sm font-medium">
            Suggestions for you
            <div className="ml-1">
              <Image src={stars_icon} alt="" />
            </div>
          </div>
        )}
        {!doubtSolveStatus && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl w-full mx-auto">
            {suggestions?.map((ques: { question: string }, i: number) => {
              if (i > 1) return;
              return (
                <SuggestedQuestionForm
                  ques={ques}
                  key={i}
                  setInput={setInput}
                  onSubmit={async (value) => {
                    setSuggestions(null);
                    await append({
                      id,
                      content: value,
                      role: "user",
                    });
                  }}
                />
              );
            })}
          </div>
        )}
        <div className="" ref={bottom}></div>
        {!doubtSolveStatus && (
          <form
            onSubmit={handleSubmit}
            className="bg-white h-[5rem] border-t px-4 flex items-center justify-center gap-x-2 fixed left-0 bottom-0 w-full shadow-md z-10"
          >
            <div className="w-full p-1 rounded-lg md:max-w-3xl flex bg-[#FFF] border-2 border-[#95B2B2]">
              <Input
                type="text"
                placeholder="Ask anything ..."
                className="w-full border-0 focus-visible:outline-none focus-visible:border-0 focus-visible:ring-0"
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="border-0 bg-[#FFF] hover:bg-[#FFF]"
                disabled={isLoading}
              >
                <Image src={ion_send} alt="" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </ScrollArea>
  );
}
