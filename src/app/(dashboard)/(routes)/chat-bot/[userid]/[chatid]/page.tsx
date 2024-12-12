import { getChat } from "@/actions/chat/chat.actions";
import { Chat } from "../../_components/chat";

export default async function ChatPage({
  params: { userid, chatid },
}: {
  params: { userid: string; chatid: string };
}) {
  const { chat, doubtSolved } = await getChat(userid, chatid);
  return (
    <div className="h-[calc(100vh-4rem)] pb-[5rem] left-0 w-full">
      <Chat
        id={chatid}
        user_id={userid}
        initialMessages={chat?.messages}
        doubtSolved={doubtSolved}
      />
    </div>
  );
}
