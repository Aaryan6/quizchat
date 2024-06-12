import { Chat } from "@/types/chat.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getChat(userid: string, chat_id: string) {
  const supabase = createClientComponentClient();
  const { data } = await supabase
    .from("chats_doubt_solve")
    .select("*")
    .eq("id", chat_id)
    .single();

  return {
    chat: (data?.payload as Chat) ?? null,
    doubtSolved: data?.solved ?? false,
  };
}

export async function addFeedback(
  user_id: string,
  chat_id: string,
  response: string,
  message: any
) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("feedback_doubt_solve")
    .upsert({ user_id, chat_id, response, message });
  if (error) {
    console.log(error);
  }
  console.log(data);
}

export async function doubtSolved(userid: string, chatid: string) {
  const supabase = createClientComponentClient();
  const { error } = await supabase
    .from("chats_doubt_solve")
    .update({ solved: true })
    .eq("user_id", userid)
    .eq("id", chatid);
  if (error) {
    console.log(error);
  }
}
