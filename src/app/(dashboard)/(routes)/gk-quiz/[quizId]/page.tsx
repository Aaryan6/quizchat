import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import {
  getGKQuizById,
  getNumberOfCompletedGKQuiz,
} from "@/actions/gk-quiz.server";
import QuizBox from "../_components/quiz-box";

export default async function QuizPage({
  params: { quizId },
}: {
  params: { quizId: string };
}) {
  const quizData = await getGKQuizById(quizId);
  const userName =
    getCookie("userName", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const user_Id =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const grade =
    getCookie("grade", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_GRADE!;

  const numberOfCompletedQuizData = await getNumberOfCompletedGKQuiz(user_Id!);

  if (!quizData?.length)
    return <div className="mt-44 text-center">Not found.</div>;
  return (
    <div className="h-[calc(100vh-4rem)] pb-[5rem] left-0 w-full">
      <QuizBox
        quizData={quizData[0]}
        quizId={quizId}
        user={{
          name: userName!,
          grade: parseInt(grade),
          id: user_Id!,
        }}
        numberOfCompletedQuizData={numberOfCompletedQuizData}
      />
    </div>
  );
}
