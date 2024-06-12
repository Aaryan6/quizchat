"use client";
import React from "react";
import NoahQuiz from "./quiz-score-tracking/noah-quiz";
import StrengthWeakness from "./quiz-score-tracking/strength-weakness";
import YourScore from "./quiz-score-tracking/your-score";
import Divider from "@mui/material/Divider";

type QuizData = {
  quizNumber: number;
  correctAnswers: number;
};
type scoreGreaterThanOrEqualTo4Data = {
  topic: string;
  totalScore: number;
};
type scoreLessThanOrEqualTo3Data = {
  topic: string;
  totalScore: number;
};
type Props = {
  dashboardData: {
    quizNumber: number | null;
    quizWise: QuizData[];
    quizCurrentStatus: {
      numberOfCompletedQuiz: number;
      level: number;
    };
  };
  insights:
    | {
        scoreGreaterThanOrEqualTo4: scoreGreaterThanOrEqualTo4Data[];
        scoreLessThanOrEqualTo3: scoreLessThanOrEqualTo3Data[];
      }
    | any;
};

const QuizScore = ({ dashboardData, insights }: Props) => {
  return (
    <div>
      <YourScore dashboardData={dashboardData} />
      <div className="mt-[2rem] mb-[2rem]">
        <Divider />
      </div>
      <div className="mt-[2rem]">
        <StrengthWeakness type="strengths" insights={insights} />
      </div>
      <div className="mt-[2rem]">
        <StrengthWeakness type="weakness" insights={insights} />
      </div>
      <div className="mt-[2rem]">
        <NoahQuiz />
      </div>
    </div>
  );
};

export default QuizScore;
