import {
  getInCompletedQuiz,
  getNumberOfCompletedQuiz,
} from "@/app/supabase-server";
import HomePage from "@/components/home-page";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const Home = async () => {
  const userName =
    getCookie("userName", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const user_Id =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const grade =
    getCookie("grade", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_GRADE!;

  const numberOfCompletedQuizData = await getNumberOfCompletedQuiz(user_Id!);
  const inCompleteQuiz = await getInCompletedQuiz(user_Id!);

  return (
    <div className="p-5 lg:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <HomePage
        inCompleteQuiz={inCompleteQuiz && inCompleteQuiz![0]}
        userId={user_Id!}
        userName={userName!}
        grade={parseInt(grade)}
        quizData={numberOfCompletedQuizData}
      />
    </div>
  );
};

export default Home;
