"use client";

import Slider from "react-slick";
import TopicCard from "./topic-card";
import Lock from "@/public/images/icons/lock.svg";
import Image from "next/image";
import { LanguageDB, LanguageQuiz } from "../learn/_types";

type Props = {
  level: {
    id: number;
    level: number;
    name: string;
  };
  data: {
    id: number;
    name: string;
    level_id: number;
    languages_quiz: LanguageQuiz[];
    languages_db: LanguageDB[];
  }[];
};

export default function TopicLevel({ level, data }: Props) {
  const totalQuestionsInLevel = data
    ?.filter((d) => d.level_id === level.level)
    .reduce((acc, topic) => acc + topic.languages_db.length, 0);

  const totalLevelPoints = totalQuestionsInLevel * level.level;

  const userPoints = data
    ?.filter((topic) => topic.level_id === level.level)
    .reduce(
      (acc, curr) =>
        acc + curr.languages_quiz.reduce((acc, curr) => acc + curr.points, 0),
      0
    );

  const previousLevelPoints = data
    ?.filter((topic) => topic.level_id === level.level - 1)
    .reduce(
      (acc, curr) =>
        acc + curr.languages_quiz.reduce((acc, curr) => acc + curr.points, 0),
      0
    );

  const totalPreviousLevelPoints =
    data
      ?.filter((d) => d.level_id === level.level - 1)
      .reduce((acc, topic) => acc + topic.languages_db.length, 0) *
    (level.level - 1);

  const isLevelUnlocked =
    level.level === 1 || previousLevelPoints >= totalPreviousLevelPoints * 0.85;

  return (
    <div className="space-y-4" key={level.id}>
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center px-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#E5F0F0] w-6 h-6 rounded-full grid place-items-center">
            <Image src={Lock} alt="lock" width={12} height={12} />
          </div>
          <h1 className="text-[#5B8989] font-semibold text-lg md:text-xl lg:text-2xl">
            {"Level " + level.level + " - "} {level.name}
          </h1>
        </div>
        <div className="w-fit">
          {isLevelUnlocked ? (
            <p className="text-[#5B8989] font-medium text-sm md:text-base">
              🪙{userPoints}/{totalLevelPoints} done
            </p>
          ) : (
            <p className="bg-[#E6EFEF] text-[#5B8989] px-2 py-1 text-sm rounded-md">
              Complete 85% of Level {level.level - 1} to unlock level{" "}
              {level.level}
            </p>
          )}
        </div>
      </div>
      <div className="">
        {data && (
          <Slider {...settings}>
            {data
              .filter((d) => d.level_id === level.level)
              .map((item, index) => (
                <TopicCard
                  key={index}
                  cards={
                    item?.languages_db?.filter(
                      (i: any) => i.level_id === level.level
                    ).length
                  }
                  lock={!isLevelUnlocked}
                  topic={item}
                  levelId={level.id}
                />
              ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2,
  initialSlide: 0,
  rows: 1,
  nextArrow: (
    <div className="carousel-buttons h-full flex items-center">
      <div className="next-slick-arrow h-full flex shrink-0 items-center bg-white shadow-md hover:bg-gray-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          stroke="black"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          className="xs:w-[15px] xs:h-[15px] md:w-[24px] md:h-[24px]"
        >
          <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
        </svg>
      </div>
    </div>
  ),
  prevArrow: (
    <div className="carousel-buttons absolute -left-4 top-0 bottom-0 h-full flex items-center">
      <div className="prev-slick-arrow h-full flex items-center bg-white shadow-md hover:bg-gray-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          stroke="black"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          className="xs:w-[15px] xs:h-[15px] md:w-[24px] md:h-[24px] rotate-180"
        >
          <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
        </svg>
      </div>
    </div>
  ),
  responsive: [
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        dots: false,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        rows: 1,
        dots: false,
      },
    },
  ],
};
