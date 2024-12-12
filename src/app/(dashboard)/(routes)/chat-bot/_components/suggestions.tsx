"use client";
import { AI } from "@/actions/chat/chat-stream";
import stars_icon from "@/assets/Images/stars_icon.png";
import { PartialAnswer } from "@/schemas/chat";
import {
  StreamableValue,
  useActions,
  useStreamableValue,
  useUIState,
} from "ai/rsc";
import { nanoid } from "nanoid";
import Image from "next/image";
import { UserMessage } from "./user-message";

type SuggestionsProps = {
  message: StreamableValue<PartialAnswer>;
};

export const SuggestionsBox: React.FC<SuggestionsProps> = ({ message }) => {
  const [data] = useStreamableValue<PartialAnswer>(message);
  const [_, setMessages] = useUIState<typeof AI>();
  const { submit } = useActions();

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
  return (
    <div className="">
      {data?.relatedQuestions?.length && (
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
  );
};
