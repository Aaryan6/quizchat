"use server";

import { createServerSupabaseClient } from "@/app/supabase-server";
import { Chat } from "@/types/chat.types";

export async function getChat(userid: string, chat_id: string) {
  const supabase = createServerSupabaseClient();
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
