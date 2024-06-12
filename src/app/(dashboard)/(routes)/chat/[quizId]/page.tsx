import { getNumberOfCompletedQuiz, getQuizById } from "@/app/supabase-server";
import Chat from "../_components/chat-box";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { getAssignStatus } from "@/lib/utils";

export default async function ChatPage({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const quizData = await getQuizById(quizId);
  const userName =
    getCookie("userName", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const user_Id =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const grade =
    getCookie("grade", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_GRADE!;
  const assignStatus = await getAssignStatus(user_Id!);

  const numberOfCompletedQuizData = await getNumberOfCompletedQuiz(user_Id!);

  if (!quizData?.length)
    return <div className="mt-44 text-center">Not found.</div>;
  return (
    <div className="h-[calc(100vh-4rem)] pb-[5rem] left-0 w-full">
      <Chat
        quizData={quizData[0]}
        quizId={quizId}
        user={{
          name: userName!,
          grade: parseInt(grade),
          id: user_Id!,
        }}
        numberOfCompletedQuizData={numberOfCompletedQuizData}
        assignStatus={assignStatus}
      />
    </div>
  );
}
