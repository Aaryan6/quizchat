import OpenAI from "openai";
import { StreamingTextResponse, OpenAIStream } from "ai";

const together = new OpenAI({
  apiKey: process.env.TOGETHER_AI_API_KEY!,
  baseURL: "https://api.together.xyz",
});

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt: question, correctOption } = body;

  const response = await together.chat.completions.create({
    model: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
    stream: true,
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `Given the question and its right answer, Your work is to explain me it in easy language and in the minimum words. This is the question: ${question}\nand the correct option is: ${correctOption}\n explain it to me.`,
      },
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream, {
    status: 200,
  });
}
