"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import ion_send from "@/assets/Images/ion_send.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Message } from "ai";
import { nanoid } from "nanoid";
import { useActions, useAIState, useUIState } from "ai/rsc";
import { AI, AIState } from "@/actions/chat/chat-stream";
import { UserMessage } from "./user-message";
import ChatMessage from "./chat-message";
import useChatQuery from "@/store/chat-query";
import { StaticBotMessage } from "./bot-message";

type ChatProps = {
  id: string;
  user_id: string;
  initialMessages: Message[];
  doubtSolved: boolean;
};

export const getUIStateFromAIState = (aiState: AIState) => {
  return aiState.messages
    ?.filter((message) => message.role.toLowerCase() !== "system")
    ?.map((message) => ({
      id: message.id,
      display:
        message.role.toLowerCase() === "user" ? (
          <UserMessage message={message.content} />
        ) : (
          <StaticBotMessage message={message.content} />
        ),
    }));
};

export function Chat({ id, user_id, initialMessages, doubtSolved }: ChatProps) {
  const { submit } = useActions();
  const [aiState, setAIState] = useAIState<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();
  const chatQuery = useChatQuery((state) => state);
  const [inputValue, setInputValue] = useState(chatQuery?.query ?? "");
  const [doubtSolveStatus, setDoubtSolveStatus] =
    useState<boolean>(doubtSolved);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage message={inputValue} />,
      },
    ]);

    const res = await submit(inputValue, id);

    setMessages((currentMessages) => [...currentMessages, res as any]);

    setInputValue("");
  };

  useEffect(() => {
    if (id && aiState.messages.length === 0) {
      setAIState({
        chatId: id,
        messages: initialMessages || [],
      });
      setMessages(
        getUIStateFromAIState({ chatId: id, messages: initialMessages || [] })
      );
    }
  }, [id]);

  return (
    <ScrollArea className="h-full w-full flex flex-col">
      <div className="flex-1 px-2 md:px-8">
        <ChatMessage
          messages={messages}
          aiState={aiState}
          initialMessages={initialMessages}
        />
        {!doubtSolveStatus && (
          <form
            onSubmit={onSubmit}
            className="bg-white h-[5rem] border-t px-4 flex items-center justify-center gap-x-2 fixed left-0 bottom-0 w-full shadow-md z-10"
          >
            <div className="w-full p-1 rounded-lg md:max-w-3xl flex bg-[#FFF] border-2 border-[#95B2B2]">
              <Input
                type="text"
                placeholder="Ask anything ..."
                className="w-full border-0 focus-visible:outline-none focus-visible:border-0 focus-visible:ring-0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                type="submit"
                className="border-0 bg-[#FFF] hover:bg-[#FFF]"
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
