export type LanguageDB = {
  id: number;
  uuid: string;
  question: string;
  options: { text: string; correct: string }[];
  explanation: string;
  level_id: number;
  topic_id: number;
  language_id: number;
  difficulty_level: string;
  created_at: Date;
  modified_at: Date;
};

export interface FlashcardData {
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export type AnswerOption = {
  id: string;
  text: string;
};

export type LanguageQuiz = {
  id: number;
  language_id: number;
  level_id: number;
  topic_id: number;
  user_id: string;
  submission: { answer: string; isCorrect: boolean; questionId: number }[];
  total: number;
  correct: number;
  card_state: number;
  points: number;
  created_at: string;
  updated_at: string;
};

export type LanguageTopic = {
  id: number;
  name: string;
  level_id: number;
  languages_db?: LanguageDB[];
  languages_quiz?: LanguageQuiz[];
};

export type LanguageQuizResult = LanguageQuiz & {
  languages_topics?: LanguageTopic;
};
