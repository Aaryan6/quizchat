"use server";
import { createClient } from "@/lib/supabase/server";

// generating questions
export const getGKQuestions = async (userId: string) => {
  let db = "fetch_rows_db_gk_easy";
  // generate two random topics
  const topics = await generateRandomTopics();

  // fetching stored correct submissions
  const questionIds = await fetchCorrectSubmissions(userId, topics);

  const questions = await fetchQuestionsForGK(10, topics, questionIds, db);
  return { questions, topics: topics };
};

// fetching question function
const fetchQuestionsForGK = async (
  limit: number,
  topics: string[],
  questionIds: string[],
  db_url: string
) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(db_url, {
    rows_limit: limit,
    topics: topics,
    uuids: questionIds,
  });

  if (error) {
    console.log(error);
  }

  return data;
};

//   generating random topics
const generateRandomTopics = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("db_gk_quiz2").select("topic");

  if (error) {
    console.log(error);
  }

  const allTopics = Array.from(new Set(data?.map((topic: any) => topic.topic)));

  const randomTopics = [] as string[];
  for (let i = 0; i < 3; i++) {
    const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
    if (randomTopics.includes(randomTopic as string)) {
      i--;
      continue;
    }
    randomTopics.push(randomTopic as string);
  }

  return randomTopics;
};

// fetching correct submissions
export const fetchCorrectSubmissions = async (
  userId: string,
  topics: string[]
) => {
  const supabase = createClient();

  const { data } = await supabase
    .from("correct_submissions_gk")
    .select("questionid")
    .eq("userid", userId)
    .in("topic", topics);

  if (!data) {
    return [];
  }

  const formattedData = data.map((quiz: any) => {
    return quiz.questionid;
  });

  return formattedData;
};

// create quiz
export async function createGKQuiz(
  userId: string,
  questions: any,
  topics: string[]
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("quiz_gk")
    .insert({
      userid: userId,
      questions: questions,
      start: true,
      multiple_topics: topics,
    })
    .select();

  if (error) {
    console.error(error);
  }

  return data;
}

// get quiz stats
export const getGKQuizStats = async (quizId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("quiz_gk")
    .select("*")
    .eq("id", quizId)
    .single();

  if (error) {
    console.error(error);
  }
  return data;
};

// update quiz
export const updateGKQuizStats = async (quizId: string, userId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("quiz_gk")
    .update({
      complete: true,
    })
    .eq("id", quizId)
    .eq("userid", userId)
    .select();
  if (error) {
    console.error(error);
    return { success: false };
  }
  return { success: true };
};

// store user submission
export async function storeUserSubmissionInGKQuiz(
  quizId: string,
  userId: string,
  submission: any
) {
  const supabase = createClient();

  const { data } = await supabase
    .from("quiz_gk")
    .update({
      submissions: submission,
    })
    .eq("id", quizId)
    .eq("userid", userId)
    .select();

  return { success: true, data };
}

// storing correct submission
export async function storeCorrectSubmissionForGK(
  userId: string,
  questionId: string,
  quizId: number,
  multiple_topics: string[]
) {
  const supabase = createClient();

  const { error } = await supabase.from("correct_submissions_gk").insert({
    userid: userId,
    questionid: questionId,
    quizid: quizId,
    multiple_topics: multiple_topics,
  });

  if (error) {
    console.error("store Correct Submission error", error);
    return { success: false };
  }

  return { success: true };
}

// add feedback in gk quiz
export const feedbackGKQuiz = async ({
  questionId,
  userId,
  response,
  reason,
}: {
  questionId: string;
  userId: string;
  response: string;
  reason: string | null;
}) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("quiz_gk_feedback")
    .insert({
      questionId: questionId,
      userId: userId,
      response: response,
      reason: reason,
    })
    .select();

  if (error) console.log(error);
  return;
};

// Get the incompleted quiz to continue it
export async function getInCompletedGKQuiz(userId: string) {
  const supabase = createClient();
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); // Calculate the timestamp for 2 hours ago
  const { data, error } = await supabase
    .from("quiz_gk")
    .select("*")
    .eq("userid", userId)
    .eq("start", true)
    .eq("complete", false)
    .gte("created_at", twoHoursAgo.toISOString())
    .limit(1); // Filter quizzes created within the last 2 hours

  if (error) {
    console.error("incomplete quiz error", error);
  }
  return data;
}

export const getNumberOfCompletedGKQuiz = async (userid: string) => {
  const supabase = createClient();
  const { data: allQuizes, error } = await supabase
    .from("quiz_gk")
    .select("questions, submissions")
    .eq("userid", userid)
    .eq("complete", true);

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
