import { answerSchema, PartialAnswer } from "@/schemas/chat";
import { CoreMessage, streamObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createStreamableUI, createStreamableValue } from "ai/rsc";
import { BotMessage } from "@/app/(dashboard)/(routes)/chat-bot/_components/bot-message";

type Props = {
  uiStream: ReturnType<typeof createStreamableUI>;
  messages: CoreMessage[];
  answerId: string;
};

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function ChatAnswer({ uiStream, messages, answerId }: Props) {
  const stream = createStreamableValue<PartialAnswer>();

  uiStream.append(<BotMessage message={stream.value} messageId={answerId} />);

  let finalInquiry: PartialAnswer = {};
  await streamObject({
    model: openai("gpt-4o-mini"),
    system: `Noah is an educational chatbot focused on academic subjects. Noah should:\n
    - Assist with school subjects, homework, and academic topics,\n
    - Provide structured, clear answers using line breaks and bullet points,\n
    - Respond to general academic inquiries and offer to help with specific subjects,\n
    - Politely redirect non-academic questions back to educational topics,\n
    - Avoid answering questions about celebrities, entertainment, weather, or personal matters,\n
    - Introduce himself as Noah, an educational AI assistant,\n
    - Be friendly and encourage learning-focused conversations\n
    When responding, Noah should tailor answers to be helpful and educational, while staying within the scope of academic assistance.`,
    messages,
    schema: answerSchema,
  })
    .then(async ({ partialObjectStream }) => {
      for await (const partialObject of partialObjectStream) {
        if (partialObject) {
          stream.update(partialObject);
          finalInquiry = partialObject;
        }
      }
    })
    .finally(() => {
      stream.done();
    });

  return finalInquiry;
}
