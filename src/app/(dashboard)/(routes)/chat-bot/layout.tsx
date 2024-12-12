import { AI } from "@/actions/chat/chat-stream";
import { nanoid } from "@/lib/utils";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AI initialAIState={{ chatId: nanoid(), messages: [] }} initialUIState={[]}>
      {children}
    </AI>
  );
}
