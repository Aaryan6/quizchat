"use client";

import { Button } from "@/components/ui/button";
import { BarChart, Bot } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import botIcon from "@/assets/Images/bot_icon.png";
import lucide_trophy from "@/assets/Images/lucide_trophy.png";
import Image from "next/image";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import { useRouter } from "next/navigation";
import { getMathQuestions, updateMathQuiz } from "@/actions/math";

if (typeof window !== "undefined") {
}

export function InitialChatMessage({
  setStart,
  started,
  user,
  setQuestionList,
  quizId,
  setQuizTopic,
  assignStatus,
}: {
  setStart: Dispatch<SetStateAction<boolean>>;
  started: boolean;
  user: { name: string; grade: number; id: string };
  setQuestionList: Dispatch<SetStateAction<any[]>>;
  quizId: string;
  setQuizTopic: Dispatch<SetStateAction<string | null>>;
  assignStatus: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const getTopicByMentor = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SANDBOX_API}/noah/topic/assigned?studentId=${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!!data.topic) return data;
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const quizOnRandomTopic = async () => {
    try {
      setLoading(true);
      const { questions, topic } = await getMathQuestions(user.grade!, user.id);
      setQuestionList(questions);
      setQuizTopic(topic);
      setStart(true);
      await updateMathQuiz(user.id, questions, topic, quizId, user.grade!);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const quizOnMentorTopic = async () => {
    try {
      setLoading(true);
      const assignedData = await getTopicByMentor();

      const { questions, topic } = await getMathQuestions(
        user.grade!,
        user.id,
        assignedData
      );
      setQuestionList(questions);
      setQuizTopic(topic);
      setStart(true);
      await updateMathQuiz(
        user.id,
        questions,
        topic,
        quizId,
        user.grade!,
        assignedData
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl w-full space-y-3">
      <div className="flex items-start gap-x-2">
        <div className="bg-orange-300 w-10 h-10 rounded-full grid place-items-center">
          <Image src={botIcon} alt="bot" className="stroke-white" />
        </div>
        <div className="flex-1 ">
          <div className="border-2 font-medium text-sm leading-5 border-[#DAE7E7] text-[#5B8989] bg-[#F9FBFB] p-4 rounded-lg rounded-ss-none">
            <div>
              <p className="text-sm py-0.5">{user && `Hello ${user.name}!`}</p>
              <p className="mt-2">
                Hope you are having a great day! Lets start the quiz with by
                going ahead with one of the available options.
              </p>
            </div>
          </div>
        </div>
      </div>
      {started ? null : (
        <div className="pl-12 grid gap-3">
          {assignStatus && (
            <Button
              onClick={quizOnMentorTopic}
              disabled={loading}
              className="justify-start max-w-sm border-2 border-[#fde8d8] text-[#e9834e] bg-[#fef3ec] hover:bg-[#fef3ec] p-4 rounded-sm"
            >
              <span>Start with topic chosen by your teacher</span>
            </Button>
          )}

          <Button
            className="justify-start max-w-sm border-2 border-[#fde8d8] text-[#e9834e] bg-[#fef3ec] hover:bg-[#fef3ec] p-4 rounded-sm"
            onClick={quizOnRandomTopic}
            disabled={loading}
          >
            <span>Start a random topic quiz based on your skill</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export function EndChatMessage({
  showQuizScore,
  user,
  startNewQuiz,
  loader,
  score,
  questionsLength,
}: {
  showQuizScore: Dispatch<SetStateAction<boolean>>;
  user: { name: string; grade: number; id: string };
  startNewQuiz: any;
  loader: boolean;
  score: number;
  questionsLength: number;
}) {
  const router = useRouter();
  return (
    <div className="max-w-3xl my-2 flex items-start w-full gap-x-2">
      <div className="bg-orange-300 w-10 h-10 rounded-full grid place-items-center">
        <Image src={botIcon} alt="bot" className="stroke-white" />
      </div>
      <div className="w-full">
        <div className="flex flex-col gap-y-4 justify-between border-2 font-medium text-sm leading-5 border-[#DAE7E7] text-[#5B8989] bg-[#F9FBFB] p-4 rounded-lg rounded-ss-none">
          <p className="text-sm py-0.5">Great work {user.name}!</p>
          <p>
            Your have scored '{score}' from out of {questionsLength}
          </p>
          <p>
            The correct and wrong answers are highlighted above. You can click
            on the O icon for the wrong answers to see the explanation.
          </p>
          <div className="flex-col md:flex-row">
            <Button
              className="min-w-[164px] mt-2 border-2 border-[#E98451] bg-transparent text-[#E98451] hover:bg-transparent"
              onClick={() => startNewQuiz()}
            >
              Start New Quiz{" "}
              {loader ? (
                <CircularProgress color="inherit" size={25} className="ml-2" />
              ) : (
                <EastOutlinedIcon className="ml-[0.5rem]" fontSize="small" />
              )}
            </Button>
            <Button
              className="min-w-[164px] mt-2 border-2 border-[#E98451] bg-transparent text-[#E98451] hover:bg-transparent md:ml-2"
              onClick={() => router.push(`/quizes`)}
            >
              End Quiz & Exit{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TopicMessage({
  topic,
  questionsLength,
}: {
  topic: string;
  questionsLength: number;
}) {
  return (
    <div className="max-w-3xl w-full space-y-3 my-2">
      <div className="flex items-start gap-x-2">
        <div className="bg-orange-300 w-10 h-10 rounded-full grid place-items-center">
          <Image src={botIcon} alt="bot" className="stroke-white" />
        </div>
        <div className="flex-1 ">
          <div className="border-2 font-medium text-sm leading-5 border-[#DAE7E7] text-[#5B8989] bg-[#F9FBFB] p-4 rounded-lg rounded-ss-none">
            <div>
              <p className="text-sm py-0.5">
                The topic in this quiz will be {topic}
              </p>
              <p className="mt-2">
                This quiz has {questionsLength} questions and your score will be
                shown in the end of the quiz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
