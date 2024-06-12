"use server";

import { createServerSupabaseClient } from "@/app/supabase-server";

export const getNumberOfCompletedGKQuiz = async (userid: string) => {
  const supabase = createServerSupabaseClient();
  const { data: allQuizes, error } = await supabase
    .from("quiz_gk")
    .select("questions, submissions")
    .eq("userid", userid)
    .eq("complete", "True");

  if (error) {
    console.error(error);
  }
  let numberOfCompletedQuiz = allQuizes?.length || 0;

  const totalQuiz =
    numberOfCompletedQuiz <= 10
      ? 10
      : numberOfCompletedQuiz - (numberOfCompletedQuiz % 10) + 10;
  const level = totalQuiz / 10;
  return {
    numberOfCompletedQuiz,
    level,
    totalQuiz,
  };
};

// Get the incompleted quiz to continue it
export async function getInCompletedGKQuiz(userId: string) {
  const supabase = createServerSupabaseClient();
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); // Calculate the timestamp for 2 hours ago
  const { data, error } = await supabase
    .from("quiz_gk")
    .select("*")
    .eq("userid", userId)
    .eq("start", true)
    .eq("complete", false)
    .gte("created_at", twoHoursAgo.toISOString()); // Filter quizzes created within the last 2 hours

  if (error) {
    console.error("incomplete quiz error", error);
  }
  return data;
}

export const getGKQuizById = async (id: any) => {
  const supabase = createServerSupabaseClient();
  try {
    let { data, error } = await supabase
      .from("quiz_gk")
      .select("*")
      .eq("id", id)
      .limit(1);

    if ((data?.length ?? 0) > 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
