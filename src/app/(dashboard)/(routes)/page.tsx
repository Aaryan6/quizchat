import { getNumberOfCompletedGKQuiz } from "@/actions/gk-quiz.server";
import {
  doubtSolveDashboard,
  getNumberOfSubmittedAnswers,
} from "@/actions/main.actions";
import HomePage from "@/components/home-page";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const Home = async () => {
  const user_Id = getCookie("userId", { cookies });
  const [mathQuiz, gkQuiz, doubtChats] = await Promise.allSettled([
    getNumberOfSubmittedAnswers(user_Id!),
    getNumberOfCompletedGKQuiz(user_Id!),
    doubtSolveDashboard(user_Id!),
  ]);
  return (
    <div className="p-5 lg:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <HomePage
        userId={user_Id!}
        mathQuiz={mathQuiz}
        gkQuiz={gkQuiz}
        doubtChats={doubtChats}
      />
    </div>
  );
};

export default Home;
