import { DeepPartial } from "ai";
import { z } from "zod";

export const answerSchema = z.object({
  answer: z.string().describe("answer of the question in structured way."),
  relatedQuestions: z
    .array(z.string())
    .length(2)
    .describe("two related questions that user can ask."),
});

export type PartialAnswer = DeepPartial<typeof answerSchema>;

export type Answer = z.infer<typeof answerSchema>;
