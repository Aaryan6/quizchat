import React from "react";
import "@/components/home-page.css";
import "./activity.css";

type StudentActivity = {
  date: string;
  numberOfQuestion: number;
};

type ActivityStreakProps = {
  studentActivity: StudentActivity[];
  subjectGradient: string;
};

const ActivityStreak: React.FC<ActivityStreakProps> = ({
  studentActivity,
  subjectGradient,
}) => {
  const maxBarHeight = 136;
  const minBarHeight = 20;
  const maxValue = Math.max(
    ...studentActivity.map((item) => item.numberOfQuestion)
  );
  const scalingFactor =
    maxValue > 0 ? (maxBarHeight - minBarHeight) / maxValue : 0;

  return (
    <div
      className="flex items-end md:w-[400px] md:h-[166px] xs:w-[313px] xs:h-[170px]"
      style={{ gap: "18px" }}
    >
      {studentActivity.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`relative rounded w-[30px] flex justify-center ${subjectGradient}`}
            style={{
              height: `${
                minBarHeight + item.numberOfQuestion * scalingFactor
              }px`,
            }}
          >
            <span className="bar-numbers">{item.numberOfQuestion}</span>
          </div>
          <div className="activityStreakTxt">{item.date}</div>
        </div>
      ))}
    </div>
  );
};

export default ActivityStreak;
