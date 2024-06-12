import React from "react";
import noahSmallIcon from "@/assets/Images/noahSmallIcon.png";
import Image from "next/image";
import Card from "./quiz-card";
import { getNumberOfCompletedMathQuiz } from "@/actions/math.server";
import { getNumberOfCompletedGKQuiz } from "@/actions/gk-quiz.server";

type Props = {
  userId: string;
  userName: string;
  grade: number;
  gkQuiz: {
    accuracy: number;
    totalQuiz: number;
  };
  totalChats: number;
};

const Quizes = async ({
  userId,
  userName,
  grade,
  gkQuiz,
  totalChats,
}: Props) => {
  const completedMathQuiz = await getNumberOfCompletedMathQuiz(userId!);
  const completedGKQuiz = await getNumberOfCompletedGKQuiz(userId!);
  return (
    <div className="flex flex-col justify-center content-center items-center">
      <div className="flex justify-between content-center items-center">
        <Image src={noahSmallIcon} alt="noah" className="h-[54px] w-[54px]" />
        <div className="ml-4 text-2xl md:text-4xl text-[#2F4F4F] font-extrabold">
          What would you like to do today?
        </div>
      </div>
      <div className="flex flex-col mt-4 w-full sm:w-[80%] lg:grid lg:grid-cols-3 gap-4 lg:mt-8">
        <Card
          type="math"
          path={"/chat"}
          user_id={userId}
          grade={grade}
          quizData={completedMathQuiz}
          gkQuiz={gkQuiz}
          totalChats={totalChats}
        />
        <Card
          type="gk"
          path={"/gk-quiz"}
          user_id={userId}
          grade={grade}
          quizData={completedGKQuiz}
          gkQuiz={gkQuiz}
          totalChats={totalChats}
        />
        <Card
          type="chat"
          path={"/chat-home"}
          user_id={userId}
          grade={grade}
          quizData={completedGKQuiz}
          gkQuiz={gkQuiz}
          totalChats={totalChats}
        />
      </div>
    </div>
  );
};

export default Quizes;
