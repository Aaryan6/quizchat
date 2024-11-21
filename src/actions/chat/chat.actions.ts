"use server";
import { nanoid } from "ai";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { AIMessage } from "./chat-stream";
import { getCookie } from "cookies-next";
import { revalidatePath } from "next/cache";
import { Chat } from "@/types/chat.types";

type StoreChats = {
  messages: AIMessage[];
  chat_id: string;
};

export const storeChat = async ({ messages, chat_id }: StoreChats) => {
  const user_id = getCookie("userId", { cookies });
  const supabase = createClient();

  const title = messages[0].content.substring(0, 100);
  const id = chat_id ?? nanoid();
  const createdAt = Date.now();
  const stringDate = new Date(createdAt).toISOString();
  const path = `/chat-bot/${user_id}/${id}`;
  const payload = {
    id,
    title,
    user_id,
    createdAt,
    path,
    messages,
  };
  // Insert chat into database.
  await supabase
    .from("chats_doubt_solve")
    .upsert({ id, payload, user_id, createdAt: stringDate })
    .throwOnError();

  revalidatePath("/", "layout");
};

export async function getChat(userid: string, chat_id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("chats_doubt_solve")
    .select("*")
    .eq("id", chat_id)
    .single();

  return {
    chat: (data?.payload as Chat) ?? null,
    doubtSolved: data?.solved ?? false,
  };
}
