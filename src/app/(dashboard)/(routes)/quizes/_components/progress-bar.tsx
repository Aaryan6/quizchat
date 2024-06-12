import React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Image from "next/image";
import levelCup from "@/assets/Images/levelCup.png";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import "@/components/home-page.css";

type Props = {
  type: string;
  quizData: any;
  gkQuiz: {
    accuracy: number;
    totalQuiz: number;
  };
};

const ProgressBar = ({ type, quizData, gkQuiz }: Props) => {
  const theme = useTheme();
  const level = quizData?.level;
  const levelPercent =
    (quizData?.numberOfCompletedQuiz / quizData?.totalQuiz) * 100;
  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 15,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 10,
      background:
        type === "gk"
          ? "linear-gradient(135deg, #4EB487 0%, #50B883 100%)"
          : "linear-gradient(90deg, #749AFF 0%, #5C7CFF 103.09%)",
    },
  }));
  return (
    <div className="relative justify-center w-full mt-[1.5rem] text-[#5B8989] font-medium leading-6 text-xs">
      <BorderLinearProgress
        variant="determinate"
        value={type === "gk" ? gkQuiz.accuracy : levelPercent}
      />
      <div className="flex justify-between content-center items-center mt-1">
        {type === "gk" ? (
          <span>
            Accuracy: <span className="font-bold">{gkQuiz.accuracy || 0}%</span> on{" "}
            {gkQuiz.totalQuiz} quizzes
          </span>
        ) : (
          <span>
            Completed {quizData?.numberOfCompletedQuiz || 0} out of{" "}
            {quizData?.totalQuiz} quizzes
          </span>
        )}
        {level > 0 && type !== "gk" && (
          <span className="level-text font-medium text-xs">Level {level}</span>
        )}
        {level > 0 && type !== "gk" && (
          <div className="absolute top-0 mt-4 -translate-y-full right-0 mr-2 translate-x-full">
            <Image src={levelCup} alt="cup" className="h-[24px] w-[24px]"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
