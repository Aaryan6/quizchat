export type QuizDataType = {
  id: number;
  userid: string;
  topic: string;
  questions: {
    id: number;
    uuid: string;
    grade: string;
    topic: string;
    options: Option[];
    subject: string;
    metadata: {
      grade: string;
      topic: string;
      subject: string;
      subtopic: string;
      learning_objective: string;
    };
    question: string;
    created_at: string;
    explanation: string;
    modified_at: string;
    blooms_level: string;
    difficulty_level: string;
    difficulty_rating: number;
  }[];
  submissions: {
    selected: {
      text: string;
      correct: string;
    };
    isCorrect: false;
    questionId: string;
  }[];
  created_at: Date;
  timestarted: Date;
  timeended: Date;
  start: boolean;
  complete: boolean;
  multiple_topics: Array<string>;
};

type Option = {
  text: string;
  correct: string;
};
