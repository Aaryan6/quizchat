"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { styled } from "@mui/material/styles";
import { cn } from "@/lib/utils";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { useRouter } from "next/navigation";
import quizIcon from "@/assets/Images/quizIcon.svg";
import calculator from "@/assets/Images/calculator.png";
import redirect_arrow from "@/assets/Images/redirect_arrow.png";
import levelCup from "@/assets/Images/levelCup.png";
import levelCupStraight from "@/assets/Images/levelCupStraight.png";
import podium from "@/assets/Images/podium.png";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import CircularProgress from "@mui/material/CircularProgress";
import "@/components/home-page.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
import { getQuestions } from "@/app/supabase-client-provider";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, {
      message: "Topic must be at least 4 characters long",
    })
    .max(50, {
      message: "Topic must be at most 50 characters long",
    }),
  amount: z.number().min(1).max(10),
  name: z.string().min(2).max(50),
  age: z.string(),
});

type Props = {
  inCompleteQuiz: any;
  userId: string;
  userName: string;
  grade: number;
  quizData: any;
};

const HomePage = ({
  inCompleteQuiz,
  userId,
  userName,
  grade,
  quizData,
}: Props) => {
  const router = useRouter();
  const theme = useTheme();

  const isActiveJourney = quizData?.numberOfCompletedQuiz == 0 ? false : true;

  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isActive] = useState<boolean>(isActiveJourney);
  const [loader, setLoader] = useState<boolean>(false);
  const [insightLoader, setInsightLoader] = useState<boolean>(false);
  const level = quizData?.level;
  const levelPercent =
    (quizData?.numberOfCompletedQuiz / quizData?.totalQuiz) * 100;

  const onSubmit = async () => {
    try {
      setLoader(true);

      if (!!inCompleteQuiz) {
        router.push(`/chat/${inCompleteQuiz.id}`);
        return;
      }

      const { questions, topics } = await getQuestions(grade, userId);
      if (questions.length === 0) {
        return;
      }

      const metadata = {
        grade: grade,
        topics: topics,
      };
      const supabase = createClientComponentClient();
      const { data: assessment_data, error } = await supabase
        .from("quiz")
        .insert({
          userid: userId,
          multiple_topics: topics,
          questions: questions,
          start: true,
          metadata: metadata,
        })
        .select();

      if (error) {
        console.error(error);
      }
      if (assessment_data && assessment_data.length > 0) {
        router.push(`/chat/${assessment_data[0].id}`);
      }
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setLoader(false);
    }
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 10,
      background: "linear-gradient(90deg, #749AFF 0%, #5C7CFF 103.09%)",
    },
  }));

  const viewScore = () => {
    if (quizData?.numberOfCompletedQuiz > 9) {
      router.push(`/view-insights`);
    }
  };

  return (
    <div className={`font-sans`}>
      <div className="w-full flex justify-center">
        <div className="w-full p-2 text-center  md:flex items-center text-[#5B8989] md:px-1 md:py-2 lg:p-2 bg-[#FDF2ED] lg:w-fit">
          <div className="flex justify-center">
            <div className="gradient-text-1 p-1 w-max">
              NEW ON <span className="gradient-text">NOAH</span>
            </div>
          </div>
          <div className="md:ml-2 lg:ml-3 md:font-medium md:text-base">
            Noah can now answer academic doubts and generate general trivia
            quizzes.
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse mt-2 lg:grid lg:grid-cols-2 gap-4 lg:mt-4">
        <div className="lg:justify-self-center lg:self-center grid gap-2 md:mt-2 lg:grid-cols-1">
          <div className="tracking-normal text-xl font-bold text-wrap md:text-4xl md:leading-10">
            {isActive ? (
              <div className="md:flex lg:flex-col">
                <span className="text-[#2F4F4F]">Continue your journey</span>
                <span className="text-[#2F4F4F] md:ml-1 lg:ml-0">
                  {" "}
                  with <span className="gradient-text">Noah</span>
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[#2F4F4F]">Introducing </span>
                <span className="gradient-text">Noah</span>
              </div>
            )}
          </div>
          {isActive ? (
            <div className="relative justify-center w-full md:w-[50%] lg:w-full mt-[2rem] text-[#5B8989] text-sm font-medium leading-6 md:text-lg">
              <BorderLinearProgress
                variant="determinate"
                value={levelPercent}
              />
              <div className="flex items-center justify-between mt-[10px]">
                <span>
                  Completed {quizData?.numberOfCompletedQuiz || 0} out of{" "}
                  {quizData?.totalQuiz} quizzes
                </span>
                {level > 0 && (
                  <span className="level-text font-bold text-sm">
                    Level {level}
                  </span>
                )}
                {level > 0 && (
                  <div className="absolute top-0 mt-5 -translate-y-full right-0 mr-7 translate-x-full">
                    <Image src={levelCup} alt="cup" />
                  </div>
                )}
              </div>
              {level > 0 && (
                <div className="flex justify-between max-w-fit p-4 bg-[#FDF2ED] mt-4">
                  <div className="justify-self-center	self-center	">
                    <Image src={levelCupStraight} alt="cup" />
                  </div>
                  <div className="justify-self-center self-center ml-2">
                    <div className="flex">
                      <span className="text-sm font-medium text-[#5B8989]">
                        You are on
                      </span>
                      <span className="text-sm font-bold red-level-text ml-1">
                        "Level {level}"
                      </span>
                    </div>
                    <div className="text-sm font-medium text-[#5B8989]">
                      Answer{" "}
                      {quizData?.totalQuiz - quizData?.numberOfCompletedQuiz}{" "}
                      more quizzes to level up!
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-[2rem] text-[#5B8989] font-medium text-wrap text-lg leading-6">
              Your personalised AI which curates quizzes to keep you engaged and
              learning
            </div>
          )}
          <div className="flex gap-2">
            {isActive ? (
              <Button
                className={cn(
                  "w-max px-11 mt-[2rem] py-6 bg-[#E98451] text-lg font-semibold text-[#FFF] hover:bg-[#E98451]",
                  mobileScreen && "px-5 py-6 w-[50%]"
                )}
                // onClick={() => onSubmit()}
                onClick={() => router.push("/quizes")}
              >
                Continue
                {loader ? (
                  <CircularProgress
                    color="inherit"
                    size={25}
                    className="ml-2"
                  />
                ) : (
                  <EastOutlinedIcon className="ml-[0.5rem]" fontSize="small" />
                )}
              </Button>
            ) : (
              <Button
                className={cn(
                  "w-max px-11 mt-[2rem] py-6 bg-[#E98451] text-lg font-semibold text-[#FFF] hover:bg-[#E98451]",
                  mobileScreen && "fixed bottom-3 w-[90%]" // Conditionally apply 'fixed bottom-0' for mobile screens
                )}
                onClick={() => router.push("/quizes")}
              >
                Get Started
                {loader ? (
                  <CircularProgress
                    color="inherit"
                    size={25}
                    className="ml-2"
                  />
                ) : (
                  <EastOutlinedIcon className="ml-[0.5rem]" fontSize="small" />
                )}
              </Button>
            )}
            {isActive && (
              <Button
                className={cn(
                  "w-max px-9 mt-[2rem] py-6 bg-[#B59585] text-lg font-semibold text-[#FFFFFF] hover:bg-[#B59585]",
                  quizData?.numberOfCompletedQuiz > 9 &&
                    "text-[#E98451] border border-[#E98451] bg-[#FFF] hover:bg-[#FFF]",
                  mobileScreen && "px-5 py-6 w-[50%]"
                )}
                onClick={viewScore}
                title={
                  quizData?.numberOfCompletedQuiz < 10
                    ? "Complete at least 10 quizzes to view insights"
                    : ""
                }
              >
                View Insights{" "}
                {insightLoader ? (
                  <CircularProgress
                    color="inherit"
                    size={25}
                    className="ml-2"
                  />
                ) : quizData?.numberOfCompletedQuiz > 9 ? (
                  <Image src={redirect_arrow} alt="redirect" className="ml-3" />
                ) : (
                  <LockOutlinedIcon className="ml-[0.5rem]" fontSize="small" />
                )}
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Image src={quizIcon} alt="quiz" style={{ height: "350px" }} />
        </div>
      </div>
      <div className="mt-[2rem] lg:mt-[5rem] grid gap-8 md:grid-cols-2">
        <Card className="flex p-4 bg-[#F0F6FA]">
          <div className="justify-self-center	self-center	">
            <Image src={calculator} alt="topics" />
          </div>
          <div className=" ml-[1.5rem] text-sm font-medium lg:text-lg leading-6 justify-self-center	self-center	text-[#5B8989]">
            Noah specializes in Math quizzes which are adaptive to your learning
          </div>
        </Card>
        <Card className="flex p-4 bg-[#F0F6FA]">
          <div className="justify-self-center self-center	">
            <Image src={podium} alt="cup" />
          </div>
          <div className="ml-[1.5rem] text-sm font-medium  lg:text-lg leading-6 justify-self-center	self-center	text-[#5B8989]">
            {level < 10
              ? "Complete at least 10 quizzes so Noah can share insights on your knowledge"
              : "Keep leveling up with more quizzes to help Noah assist you better"}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
