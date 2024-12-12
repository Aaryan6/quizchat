"use client";
import { AI } from "@/actions/chat/chat-stream";
import { PartialAnswer } from "@/schemas/chat";
import {
  StreamableValue,
  useActions,
  useAIState,
  useStreamableValue,
  useUIState,
} from "ai/rsc";
import Image from "next/image";
import botIcon from "@/assets/Images/noah_dp.svg";
import stars_icon from "@/assets/Images/stars_icon.png";
import { cn, nanoid } from "@/lib/utils";
import { UserMessage } from "./user-message";
import ChatSolved from "./chat-cta";
import FeedBackForm from "./feedback-form";
import { getCookie } from "cookies-next";
import { MemoizedReactMarkdown } from "@/components/markdown";

type BotMessageProps = {
  message: StreamableValue<PartialAnswer>;
  messageId?: string;
};

export const BotMessage: React.FC<BotMessageProps> = ({
  message,
  messageId,
}) => {
  const userId = getCookie("userId");
  const [data] = useStreamableValue<PartialAnswer>(message);
  const [_, setMessages] = useUIState<typeof AI>();
  const [aiState] = useAIState<typeof AI>();
  const { submit } = useActions();
  const showActions =
    messageId === aiState?.messages[aiState?.messages.length - 1]?.id;

  const followUp = async (inputValue: string) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage message={inputValue} />,
      },
    ]);

    const res = await submit(inputValue);

    setMessages((currentMessages) => [...currentMessages, res as any]);
  };

  if (!data) return;
  return (
    <div className="flex-1 relative w-full">
      <div className="flex w-full justify-start gap-x-2 max-w-4xl mx-auto h-full">
        <div className="bg-white border border-orange-200 w-10 h-10 rounded-full grid place-items-center">
          <Image src={botIcon} alt="user" className="stroke-orange-300" />
        </div>
        <div
          className={
            "w-fit grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-relaxed border-[#F0F6FA] text-[#5B8989] bg-[#F0F6FA] p-4 rounded-lg rounded-ss-none"
          }
        >
          <MemoizedReactMarkdown
            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            components={{
              li: ({ children }) => (
                <li className="list-disc ml-4 my-1">{children}</li>
              ),
              h1: ({ children }) => (
                <h1 className="text-xl font-bold my-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font- my-4">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-bold my-4">{children}</h3>
              ),
              blockquote: ({ children }) => (
                <blockquote className="italic bg-white px-4 rounded-md">
                  {children}
                </blockquote>
              ),
              p: ({ children }) => <p className="my-2">{children}</p>,
            }}
          >
            {data?.answer}
          </MemoizedReactMarkdown>
        </div>
      </div>
      {showActions && (
        <>
          <FeedBackForm
            answer={data?.answer!}
            answerId={messageId}
            chat_id={aiState.chatId}
            user_id={userId!}
          />
          <ChatSolved chatId={aiState.chatId} userId={userId!} />
        </>
      )}
      <div className={cn(showActions ? "inline-block" : "hidden", "pb-2")}>
        {!!data?.relatedQuestions?.length && (
          <div className="flex items-center max-w-3xl w-full mx-auto mt-[2rem] mb-2 text-[#2F4F4F] text-sm font-medium">
            Suggestions for you
            <div className="ml-1">
              <Image src={stars_icon} alt="" />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl w-full mx-auto">
          {data?.relatedQuestions?.map((q, i) => (
            <button
              key={i}
              type="button"
              className="flex items-center w-full h-full cursor-pointer rounded-md border border-[#E4E2DC] bg-[#F6F5F4] px-3 py-2 text-sm text-[#5B8989] hover:bg-[#E4E2DC]"
              onClick={() => followUp(q!)}
            >
              <div className="mr-1">
                <Image src={stars_icon} alt="" />
              </div>
              <div className="text-left ml-2">{q}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const StaticBotMessage: React.FC<{
  message: string;
}> = ({ message }) => {
  if (!message) return;
  return (
    <div className="flex-1 relative w-full">
      <div className="flex w-full justify-start gap-x-2 max-w-4xl mx-auto h-full">
        <div className="bg-white border border-orange-200 w-10 h-10 rounded-full grid place-items-center">
          <Image src={botIcon} alt="user" className="stroke-orange-300" />
        </div>
        <div
          className={
            "w-fit grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-5 border-[#F0F6FA] text-[#5B8989] bg-[#F0F6FA] p-4 rounded-lg rounded-ss-none"
          }
        >
          <MemoizedReactMarkdown
            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            components={{
              li: ({ children }) => (
                <li className="list-disc ml-4 my-1">{children}</li>
              ),
              h1: ({ children }) => (
                <h1 className="text-xl font-bold my-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font- my-4">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-bold my-4">{children}</h3>
              ),
              blockquote: ({ children }) => (
                <blockquote className="italic bg-white px-4 rounded-md">
                  {children}
                </blockquote>
              ),
              p: ({ children }) => <p className="my-2">{children}</p>,
            }}
          >
            {JSON.parse(message)?.answer}
          </MemoizedReactMarkdown>
        </div>
      </div>
    </div>
  );
};
