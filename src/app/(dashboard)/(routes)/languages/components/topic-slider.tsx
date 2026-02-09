"use client";

import { useQuery } from "@tanstack/react-query";
import { getLanguageTopics } from "@/actions/language.actions";
import ClipLoader from "react-spinners/ClipLoader";
import { getCookie } from "cookies-next";
import TopicLevel from "./topic-level";

export default function TopicSlider({
  levels,
  langId,
}: {
  levels: { id: number; level: number; name: string; points: number }[];
  langId: number;
}) {
  const userId = getCookie("userId");
  const { data, isLoading, error } = useQuery({
    queryKey: ["language_topics", langId, userId],
    queryFn: async () => {
      if (!userId) return null;
      return await getLanguageTopics({ langId, userId });
    },
    retry: false,
  });

  if (error) {
    console.error("Error loading topics:", error);
    return <div>Failed to load topics. Please try again.</div>;
  }

  return (
    <div className="space-y-16 py-6 pb-16">
      <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-center space-y-1">
        <h1 className="text-[#5B8989]">
          <span className="bg-gradient-to-br from-pink-500 to-yellow-500 text-transparent bg-clip-text">
            Master
          </span>{" "}
          every topic
        </h1>
        <h1 className="text-[#5B8989]">
          Progress through levels with more{" "}
          <span className="bg-gradient-to-br from-yellow-500 to-pink-500 text-transparent bg-clip-text">
            practice
          </span>
        </h1>
      </div>
      <div className="carousel-container space-y-16">
        {isLoading && (
          <div className="flex flex-row justify-center">
            <ClipLoader
              color={"#C4C3C1"}
              loading={isLoading}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loading"
            />
          </div>
        )}
        {!isLoading &&
          levels.map((level) => <TopicLevel level={level} data={data!} />)}
      </div>
    </div>
  );
}
