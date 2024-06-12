import QuizScore from "@/components/quiz-score";
import React, { Suspense } from "react";
import { getDashboard, getInsight } from "@/app/supabase-server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};

const PageContent = async (props: Props) => {
  const user_Id =
    getCookie("userId", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_ID!;
  const grade =
    getCookie("grade", { cookies }) || process.env.NEXT_PUBLIC_DEMO_USER_GRADE!;
  const dashboardData = await getDashboard(user_Id!);
  const insights = await getInsight(user_Id!, parseInt(grade));
  return (
    <div className="p-5 md:p-12 w-full md:max-w-5xl mx-auto bg-[#FFF] !important">
      <QuizScore dashboardData={dashboardData} insights={insights} />
    </div>
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
