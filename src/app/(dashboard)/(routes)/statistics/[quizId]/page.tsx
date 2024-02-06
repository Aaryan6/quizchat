import { buttonVariants } from "@/components/ui/button";

import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";
import React from "react";
import ResultsCard from "@/components/results-card";
import AccuracyCard from "@/components/accuracy-card";
import TimeTakenCard from "@/components/time-taken-card";
import QuestionsList from "@/components/questions-list";
import { getQuizStats } from "@/app/supabase-server";

type Props = {
  params: {
    quizId: string;
  };
};

const Statistics = async ({ params: { quizId } }: Props) => {
  // unique game where: { id: quizId },
  // include: { questions: true },
  const quiz_stats = await getQuizStats(quizId);
  const game = {
    questions: [{ isCorrect: true }],
    timeEnded: 0,
    timeStarted: 0,
  };
  if (!game) {
    return redirect("/");
  }

  let accuracy: number = 0;

  let totalCorrect = quiz_stats.submissions.reduce(
    (acc: any, question: any) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    },
    0
  );

  const questionLength = quiz_stats.questions.length;
  accuracy = (totalCorrect / questionLength) * 100;

  return (
    <>
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Summary</h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          {/* <TimeTakenCard
            timeEnded={new Date(game.timeEnded ?? 0)}
            timeStarted={new Date(game.timeStarted ?? 0)}
          /> */}
        </div>
        <QuestionsList
          questions={quiz_stats.questions}
          submissions={quiz_stats.submissions}
        />
        <div></div>
      </div>
    </>
  );
};

export default Statistics;
