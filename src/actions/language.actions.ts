"use server";

import {
  LanguageDB,
  LanguageQuiz,
} from "@/app/(dashboard)/(routes)/languages/learn/_types";
import { createClient } from "@/lib/supabase/server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getLanguageLevels = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("languages_levels").select("*");

  if (error) {
    console.log(error);
  }

  return data;
};

export const getLanguageTopics = async ({
  langId,
  userId,
}: {
  langId: number;
  userId: string;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("languages_topics")
    .select("*, languages_db(*), languages_quiz(*)")
    .eq("languages_db.language_id", langId)
    .eq("languages_quiz.user_id", userId)
    .eq("languages_quiz.language_id", langId)
    .filter("languages_db", "not.is", null);

  if (error) {
    console.log(error);
  }

  return data;
};

export const getLanguageIdByName = async (name: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("subject")
    .select("id")
    .eq("subject_name", name.toLowerCase())
    .single();

  if (error) {
    console.log(error);
  }

  return data;
};

export const getTotalQuestionsCount = async () => {
  const supabase = createClient();
  const { data } = await supabase
    .from("languages_db")
    .select("id, language_id");

  return data || [];
};

export const getTopicContent = async ({
  language,
  topic,
  from,
  to,
}: {
  topic: number;
  language: string;
  from: number;
  to: number;
}) => {
  const supabase = createClient();
  const languageId = await getLanguageIdByName(language);

  const { data } = await supabase
    .from("languages_db")
    .select("*")
    .eq("topic_id", topic)
    .eq("language_id", languageId?.id)
    .order("id", { ascending: true })
    .range(from - 1 || 0, to - 1 || 5);

  return data;
};

type QuizSubmission = {
  questionId: number;
  answer: string;
  isCorrect: boolean;
};

export const saveQuizData = async ({
  userId,
  total,
  correct,
  submission,
  language,
  topicId,
  levelId,
  state,
}: {
  userId: string;
  total: number;
  correct: number;
  submission: QuizSubmission[];
  language: string;
  topicId: number;
  levelId: number;
  state: number;
}) => {
  const supabase = createClient();
  const languageData = await fetchLanguageIdfromSlug(language);

  // Calculate points based on level
  const pointsPerQuestion = levelId;
  const points = correct * pointsPerQuestion;

  const { data, error } = await supabase
    .from("languages_quiz")
    .insert({
      user_id: userId,
      total,
      correct,
      points,
      submission,
      language_id: languageData?.id,
      topic_id: topicId,
      level_id: levelId,
      card_state: state,
    })
    .select("*")
    .single();

  if (error) {
    console.log(error);
  }
  return data;
};

export const updateQuizData = async ({
  userId,
  total,
  correct,
  submission,
  language,
  topicId,
  levelId,
  quizId,
  state,
}: {
  userId: string;
  total: number;
  correct: number;
  submission: QuizSubmission[];
  language: string;
  topicId: number;
  levelId: number;
  quizId: number;
  state: number;
}) => {
  const supabase = createClient();

  // Get the existing quiz data first
  const { data: existingQuiz } = await supabase
    .from("languages_quiz")
    .select("*")
    .eq("id", quizId)
    .single();

  // Calculate points for the new attempt
  const pointsPerQuestion = levelId;
  const newPoints = correct * pointsPerQuestion;

  // Only update if new points are higher than existing points
  if (existingQuiz && newPoints <= existingQuiz.points) {
    return existingQuiz;
  }

  const { data, error } = await supabase
    .from("languages_quiz")
    .update({
      user_id: userId,
      total,
      correct,
      points: newPoints,
      submission,
      topic_id: topicId,
      level_id: levelId,
      card_state: state,
    })
    .eq("id", quizId)
    .select("*")
    .single();

  if (error) {
    console.log(error);
  }
  return data;
};

export const fetchLanguageIdfromSlug = async (slug: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("subject")
    .select("id,subject_name")
    .eq("subject_name", slug.toLowerCase())
    .single();
  return data;
};

type LearningSubmission = {
  questionId: number;
  answer: string;
  isCorrect: boolean;
};

export const saveLearningData = async ({
  userId,
  total,
  correct,
  submission,
  language,
  topicId,
  levelId,
}: {
  userId: string;
  total: number;
  correct: number;
  submission: LearningSubmission[];
  language: string;
  topicId: number;
  levelId: number;
}) => {
  const supabase = createClient();

  const languageData = await fetchLanguageIdfromSlug(language);
  const { data, error } = await supabase
    .from("languages_learning")
    .insert({
      user_id: userId,
      total,
      correct,
      submission,
      language_id: languageData?.id,
      topic_id: topicId,
      level_id: levelId,
    })
    .select("*")
    .single();

  if (error) {
    console.log(error);
  }
  return data;
};

export const getUserCardState = async ({
  userId,
  topicId,
  levelId,
  state,
  lang,
}: {
  userId: string;
  topicId: number;
  levelId: number;
  state: number;
  lang: string;
}) => {
  const supabase = createClient();

  const languageData = await fetchLanguageIdfromSlug(lang);
  const { data, error } = await supabase
    .from("languages_quiz")
    .select("*")
    .eq("user_id", userId)
    .eq("topic_id", topicId)
    .eq("level_id", levelId)
    .eq("card_state", state)
    .eq("language_id", languageData?.id)
    .single();

  return data;
};

export const fetchQuizResult = async (quizId: number) => {
  const userId = getCookie("userId", { cookies });
  const supabase = createClient();

  const { data, error } = await supabase
    .from("languages_quiz")
    .select("*, languages_topics(*, languages_quiz(*), languages_db(*))")
    .eq("id", quizId)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  const topicDB = data?.languages_topics?.languages_db?.filter(
    (topic: LanguageDB) =>
      topic.language_id === data?.language_id &&
      topic?.level_id === data?.level_id &&
      topic?.topic_id === data?.topic_id
  );

  const quizDB = data?.languages_topics?.languages_quiz?.filter(
    (quiz: LanguageQuiz) =>
      quiz.language_id === data?.language_id && quiz.user_id === userId
  );

  const totalQuestions = topicDB?.length || 0;
  const completedQuestions =
    quizDB?.reduce(
      (acc: number, curr: LanguageQuiz) => acc + curr.submission.length,
      0
    ) || 0;

  // Calculate level total questions and completed questions
  const levelDB = await supabase
    .from("languages_db")
    .select("*")
    .eq("level_id", data?.level_id)
    .eq("language_id", data?.language_id);

  const levelTotalQuestions = levelDB.data?.length || 0;
  const levelCompletedQuestions = await supabase
    .from("languages_quiz")
    .select("submission, correct")
    .eq("level_id", data?.level_id)
    .eq("language_id", data?.language_id)
    .eq("user_id", data?.user_id);

  const levelCompleted =
    levelCompletedQuestions.data?.reduce(
      (acc: number, curr: { submission: any[]; correct: number }) =>
        acc + curr.correct,
      0
    ) || 0;

  const levelPoints = levelCompleted * data?.level_id;

  // Calculate total points for the current topic
  const topicPoints =
    quizDB?.reduce((acc: number, curr: LanguageQuiz) => acc + curr.points, 0) ||
    0;

  const { data: upcomingTopics } = await supabase
    .from("languages_topics")
    .select("*, languages_db(*)")
    .eq("level_id", data?.level_id)
    .eq("languages_db.language_id", data?.language_id)
    .order("id", { ascending: true })
    .gt("id", data?.languages_topics?.id)
    .limit(4);
  return {
    totalQuestions,
    completedQuestions,
    levelTotalQuestions,
    levelCompletedQuestions: levelCompleted,
    levelPoints,
    topicPoints,
    upcomingTopics,
    ...data,
  };
};
