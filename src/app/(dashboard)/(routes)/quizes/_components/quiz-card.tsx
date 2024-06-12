"use client";
import React, { useEffect, useState } from "react";
import mathIcon from "@/assets/Images/mathIcon.png";
import gkIcon from "@/assets/Images/gk-icon.png";
import chatsIcon from "@/assets/Images/chatsIcon.png";
import start_chat_icon from "@/assets/Images/start_chat_icon.png";
import chatIcon from "@/assets/Images/chat-icon.png";
import Image from "next/image";
import ProgressBar from "./progress-bar";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import redirect_arrow from "@/assets/Images/redirect_arrow.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FastForwardOutlinedIcon from "@mui/icons-material/FastForwardOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  createGKQuiz,
  getGKQuestions,
  getInCompletedGKQuiz,
} from "@/actions/gk-quiz";
import {
  createMathQuiz,
  getInCompletedMathQuiz,
  getMathQuestions,
} from "@/actions/math";

type Props = {
  type: string;
  path: string;
  user_id: string;
  grade: number;
  quizData: any;
  gkQuiz: {
    accuracy: number;
    totalQuiz: number;
  };
  totalChats: number;
};
const Card = ({
  type,
  path,
  user_id,
  grade,
  quizData,
  gkQuiz,
  totalChats,
}: Props) => {
  const isActiveJourney = quizData?.numberOfCompletedQuiz == 0 ? false : true;
  const [isActive] = useState<boolean>(isActiveJourney);
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [insightLoader, setInsightLoader] = useState<boolean>(false);

  const viewScore = () => {
    if (quizData?.numberOfCompletedQuiz > 9) {
      router.push(`/view-insights`);
    }
  };

  const generateMathQuiz = async () => {
    try {
      setLoader(true);

      const inCompleteQuiz = await getInCompletedMathQuiz(user_id);

      if (inCompleteQuiz && inCompleteQuiz?.length! > 0) {
        router.push(`/chat/${inCompleteQuiz[0]?.id}`);
        setLoader(false);
        return;
      }

      // create quiz and redirect to quiz page
      const data = await createMathQuiz(user_id, grade!);
      if (!data) return;
      router.push(`/chat/${data[0]?.id}`);
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setLoader(false);
    }
  };

  const generateGKQuiz = async () => {
    try {
      setLoader(true);

      const inCompleteQuiz = await getInCompletedGKQuiz(user_id);

      if (inCompleteQuiz && inCompleteQuiz?.length! > 0) {
        router.push(`/gk-quiz/${inCompleteQuiz[0]?.id}`);
        setLoader(false);
        return;
      }

      const { questions, topics } = await getGKQuestions(user_id);
      if (questions.length === 0) {
        return;
      }

      // create gk quiz and redirect to gk-quiz page
      const data = await createGKQuiz(user_id, questions, topics);
      if (!data || !data!.length) return;
      router.push(`/gk-quiz/${data[0]?.id}`);
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setLoader(false);
    }
  };

  const navigateTo = async () => {
    setLoader(true);
    if (path === "/chat") {
      generateMathQuiz();
    } else if (path === "/chat-home") {
      router.push(path);
      setLoader(false);
    } else {
      generateGKQuiz();
    }
  };

  useEffect(() => {
    (async () => {
      // await getNumberOfCompletedQuizes();
    })();
  }, [isActive]);

  // const getNumberOfCompletedQuizes = async () => {
  //   if (type === "chat") return;
  //   if (type === "math") {
  //     const completedMathQuiz = await getNumberOfCompletedMathQuiz(user_id!);
  //     setIsActive(completedMathQuiz.numberOfCompletedQuiz > 0);
  //     setQuizData(completedMathQuiz);
  //     return;
  //   }
  //   if (type === "gk") {
  //     const completedGKQuiz = await getNumberOfCompletedGKQuiz(user_id!);
  //     setIsActive(completedGKQuiz.numberOfCompletedQuiz > 0);
  //     setQuizData(completedGKQuiz);
  //     return;
  //   }
  // };

  return (
    <div className="bg-[#F0F6FA] w-full py-4 px-6 flex flex-col justify-center content-center items-center rounded-lg">
      <Image
        src={type === "math" ? mathIcon : type === "gk" ? gkIcon : chatIcon}
        alt=""
      />
      <span className="text-[#2F4F4F] text-lg font-extrabold mt-2">
        {type === "math"
          ? "Math Quiz"
          : type === "gk"
          ? "General Quiz"
          : "Doubt Solving"}
      </span>
      <div className="text-center text-[#5B8989] text-sm font-medium mt-2">
        {type === "math" && isActive
          ? "Get better. One quiz at a time"
          : type === "math" && !isActive
          ? "Explore math topic based quizzes which are adaptive and personalised for you"
          : type === "gk" && isActive
          ? "General trivia. Just for fun."
          : type === "gk" && !isActive
          ? "Explore quizzes around diverse topics to test your general knowledge"
          : type === "chat" && totalChats > 0
          ? "Ask anything. Anytime"
          : "Chat with Noah to get your academic doubts resolved for any subject"}
      </div>
      {type === "chat" && totalChats > 0 ? (
        <div className="w-full text-[#5B8989] flex justify-center content-center items-center mt-[2rem]">
          <Image src={chatsIcon} alt="chat" />
          <span className="font-bold text-xl ml-1">{totalChats}</span>
          <span className="text-sm font-medium mt-1 ml-1">chats done</span>
        </div>
      ) : (
        isActive && (
          <div className="w-[70%] sm:w-[55%] lg:w-full">
            <ProgressBar type={type} quizData={quizData} gkQuiz={gkQuiz} />
          </div>
        )
      )}
      <div
        className={cn(
          "w-[70%] sm:w-[55%] lg:w-full",
          isActive && type === "math"
            ? "flex justify-between"
            : "flex justify-center"
        )}
      >
        {isActive && type === "math" && (
          <Button
            className={cn(
              "w-max mt-[1.5rem] py-[6px] px-[12px] bg-[#B59585] text-sm font-semibold text-[#FFFFFF] hover:bg-[#B59585]",
              quizData?.numberOfCompletedQuiz > 9 &&
                "text-[#E98451] border-2 border-[#E98451] bg-[#FFF] hover:bg-[#FFF]"
              // mobileScreen && "px-5 py-6 w-[50%]"
            )}
            onClick={viewScore}
            title={
              quizData?.numberOfCompletedQuiz < 10
                ? "Complete at least 10 quizzes to view insights"
                : ""
            }
          >
            Insights{" "}
            {insightLoader ? (
              <CircularProgress color="inherit" size={25} className="ml-2" />
            ) : quizData?.numberOfCompletedQuiz > 9 ? (
              <Image src={redirect_arrow} alt="redirect" className="ml-2" />
            ) : (
              <LockOutlinedIcon className="ml-2" fontSize="small" />
            )}
          </Button>
        )}
        {isActive ? (
          <Button
            className={cn(
              "w-max mt-[1.5rem] py-[6px] px-[12px] bg-[#E98451] text-sm font-semibold text-[#FFF] hover:bg-[#E98451]"
              // mobileScreen && "px-5 py-6 w-[50%]"
            )}
            onClick={() => navigateTo()}
          >
            {type !== "chat" ? "Continue" : "Start Chat"}
            {loader ? (
              <CircularProgress color="inherit" size={25} className="ml-2" />
            ) : type !== "chat" ? (
              <FastForwardOutlinedIcon
                className="ml-[0.5rem]"
                fontSize="small"
              />
            ) : (
              <Image src={start_chat_icon} alt="chat" className="ml-[0.5rem]" />
            )}
          </Button>
        ) : (
          <Button
            className={cn(
              "w-max mt-[1.5rem] py-[6px] px-[12px] bg-[#E98451] text-sm font-semibold text-[#FFF] hover:bg-[#E98451]"
              // mobileScreen && "fixed bottom-3 w-[90%]" // Conditionally apply 'fixed bottom-0' for mobile screens
            )}
            onClick={() => navigateTo()}
          >
            {type !== "chat" ? "Get Started" : "Start Chat"}
            {loader ? (
              <CircularProgress color="inherit" size={25} className="ml-2" />
            ) : isActive && totalChats > 0 ? (
              <FastForwardOutlinedIcon
                className="ml-[0.5rem]"
                fontSize="small"
              />
            ) : !isActive && type !== "chat" ? (
              <ArrowForwardOutlinedIcon
                className="ml-[0.5rem]"
                fontSize="small"
              />
            ) : (
              <Image src={start_chat_icon} alt="chat" className="ml-[0.5rem]" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
