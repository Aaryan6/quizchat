"use client";
import "../../subject-dashboard/components/subject-dashboard.css";
import Activity from "@/components/activity/activity";
import GlobalLeaderboard from "@/components/leaderboard";
import { useState, useEffect } from "react";
import LanguageCard from "../components/language-card";
import HeadingCard from "../components/heading-card";
import TopicSlider from "../components/topic-slider";
import { useQuery } from "@tanstack/react-query";
import {
  getLanguageDashboard,
  getStudentActivity,
} from "@/lib/student-dashboard/apiClient";
import type { LeaderboardResponse } from "@/lib/types/leaderboard";
import { getCookie } from "cookies-next";

type Props = {
  levels: {
    level: number;
    id: number;
    name: string;
    points: number;
  }[];
  lang: string;
  langId: number;
  totalQuestions: {
    id: number;
    language_id: number;
  }[];
};

const LanguageDashboard = ({ levels, lang, langId, totalQuestions }: Props) => {
  const userId = getCookie("userId");

  const { data: dashboardData, isLoading: dashboardLoader } =
    useQuery<LeaderboardResponse>({
      queryKey: ["languageLeaderboard", userId, langId],
      queryFn: () =>
        getLanguageDashboard({
          userId: userId || null,
          lang: langId || null,
        }),
      enabled: !!userId && !!langId,
    });

  const { data: activityData, isLoading: activityLoader } = useQuery({
    queryKey: ["studentActivity", userId, langId],
    queryFn: () =>
      getStudentActivity({
        studentId: userId || null,
        subjectId: langId || null,
      }),
    enabled: !!userId && !!langId,
  });

  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    if (activityData?.response) {
      if (activityData.response.currentStudentMeta?.pic) {
        setAvatar(activityData.response.currentStudentMeta.pic);
        localStorage.setItem(
          "user-avatar",
          activityData.response.currentStudentMeta.pic
        );
      }
    }
  }, [activityData]);

  const currentStudent = dashboardData?.leaderboard?.topTenStudentList?.find(
    (row: any) => row.user_id === userId
  );

  const studentData = activityData?.response?.currentStudentMeta
    ? {
        ...activityData.response.currentStudentMeta,
        rank: currentStudent?.rank,
      }
    : null;

  const leaderboardData = {
    studentMeta: {},
    topTenStudentList:
      dashboardData?.leaderboard?.topTenStudentList?.map((item) => ({
        userid: item.user_id,
        count: item.totalPoints,
        rank: item.rank,
      })) || [],
  };

  return (
    <div className="w-full md:max-w-7xl mx-auto bg-[#FFF] pb-10 overflow-hidden !important">
      <div className="font-sans w-full flex justify-center">
        <div className="w-full flex justify-center flex-col">
          <HeadingCard lang={lang as string} />
          <LanguageCard
            lang={lang as string}
            langId={langId}
            totalQuestions={totalQuestions}
          />
          <div className="flex lg:flex-row xs:flex-col justify-center gap-8 lg:mt-14 md:mt-6 xs:mt-12 mb-10 px-4">
            <Activity
              subject={lang}
              studentActivity={activityData?.response?.activity || []}
              streakData={activityData?.response?.streak || {}}
              studentData={studentData}
              avatar={avatar}
              setAvatar={setAvatar}
              loading={dashboardLoader || activityLoader}
            />
            <GlobalLeaderboard
              leaderboardData={leaderboardData}
              studentData={studentData}
              avatar={avatar}
              loading={dashboardLoader}
            />
          </div>

          <div id={"topics"} className="lg:mt-20 md:mt-12">
            {levels && <TopicSlider levels={levels} langId={langId} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageDashboard;
