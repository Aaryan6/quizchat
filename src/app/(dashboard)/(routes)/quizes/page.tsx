import { Suspense } from "react";
import { gkQuiz, doubtSolveDashboard } from "@/app/supabase-server";
import Quizes from "./_components/quizes";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import CircularProgress from "@mui/material/CircularProgress";

const PageContent = async () => {
  const userName =
    getCookie("userName", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const user_Id =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const grade =
    getCookie("grade", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_GRADE!;
  const gk_quiz = await gkQuiz(user_Id!);
  const total_chats = await doubtSolveDashboard(user_Id!);

  return (
    <Quizes
      userId={user_Id!}
      userName={userName!}
      grade={parseInt(grade)}
      totalChats={total_chats}
      gkQuiz={gk_quiz}
    />
  );
};

const Page = () => {
  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[90vh]">
            <CircularProgress size={40} />
          </div>
        }
      >
        <PageContent />
      </Suspense>
    </div>
  );
};

export default Page;
