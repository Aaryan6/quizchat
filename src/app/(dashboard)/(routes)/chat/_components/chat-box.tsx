"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import MCQBox from "./mcq-box";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import SelectedAnswer from "./selected-answer";
import { Input } from "@/components/ui/input";
import QuizScore from "./quiz-score-diloag";
import { EndChatMessage, InitialChatMessage } from "./chat-messages";
import { updateQuizStats } from "@/app/supabase-client-provider";
import { Button } from "@/components/ui/button";

type Option = {
  text: string;
  correct: string;
};

export default function Chat({
  questionList,
  quizId,
}: {
  questionList: any[];
  quizId: string;
}) {
  const bottom = useRef<HTMLDivElement>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [submissions, setSubmissions] = useState([] as any[]);
  const [quizScore, showQuizScore] = useState(false);
  const [start, setStart] = useState(true);
  const [userInput, setUserInput] = useState("");

  // Get the current question
  const currentQuestion = useMemo(() => {
    return questionList[questionIndex];
  }, [questionIndex, questionList]);

  // Get the options for the current question
  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options) as Option[];
  }, [currentQuestion]);

  // Scroll to the bottom of the chat
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [bottom.current, currentQuestion, submissions, hasEnded]);

  // End the quiz
  const endGame = async () => {
    const user = sessionStorage.getItem("quiz_user");
    const userId = JSON.parse(user!).id;
    if (!userId) return;
    // Update the quiz stats
    const { success } = await updateQuizStats(quizId, submissions, userId);
    if (!success) {
      toast({ title: "Something went wrong!", duration: 3000 });
    }
  };

  // Check if the selected answer is correct
  const checkAnswer = (index: number) => {
    const isCorrect = options[index!].correct === "true";
    return isCorrect;
  };

  // Handle the next button click
  const handleNext = useCallback(
    (index: number) => {
      if (!options[index]) {
        toast({ title: "Invalid answer", duration: 3000 });
        return;
      }
      const isCorrect = checkAnswer(index);

      setSubmissions((submissions) => [
        ...submissions,
        {
          questionId: currentQuestion?.uuid,
          selected: options[index!],
          isCorrect,
        },
      ]);
      if (allQuestionsAnswered) {
        console.log(submissions, submissions.length, questionList.length);
        return;
      }
      // Move to the next question
      setQuestionIndex((questionIndex) => questionIndex + 1);
    },
    [checkAnswer, questionIndex, questionList]
  );

  // Check if all questions have been answered
  const allQuestionsAnswered = useMemo(() => {
    return submissions.length === questionList.length;
  }, [submissions, questionList]);

  useEffect(() => {
    // Show the quiz score
    if (allQuestionsAnswered) {
      setHasEnded(true);
      endGame();
      return;
    }
  }, [submissions]);

  const handleUserInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle user input
    if (userInput === "") {
      toast({ title: "Enter the answer", duration: 3000 });
    }
    // converting user input to lowercase and removing any extra spaces
    const optimizedAnswer: string = userInput.toLowerCase().trim();
    const formattedOptions = ["a", "b", "c", "d"];
    // Check if the user input is in type of a, b, c, d
    if (formattedOptions.includes(optimizedAnswer)) {
      const index = formattedOptions.indexOf(optimizedAnswer);
      handleNext(index);
      setUserInput("");
    } else {
      // Check if the user input is in the options text
      const optionTexts = options.map((option) =>
        option.text.toLowerCase().trim()
      );
      const index = optionTexts.indexOf(optimizedAnswer);
      if (index === -1) {
        toast({ title: "Invalid answer", duration: 3000 });
        return;
      }
      handleNext(index);
      setUserInput("");
    }
  };

  return (
    <ScrollArea className="h-full w-full flex flex-col">
      <div className="flex-1 px-2 md:px-8">
        <div className="pb-4 max-w-4xl mx-auto h-full w-full">
          <Toaster />
          <InitialChatMessage setStart={setStart} />
          {start &&
            questionList.slice(0, questionIndex + 1).map((question, i) => (
              <div className="grid" key={i}>
                <MCQBox
                  currentQuestion={question}
                  handleNext={handleNext}
                  submissions={submissions}
                  questionIndex={i + 1}
                />
                <SelectedAnswer submissions={submissions} index={i} />
              </div>
            ))}
          {hasEnded && <EndChatMessage showQuizScore={showQuizScore} />}
        </div>
        <div className="" ref={bottom}></div>
        <form
          onSubmit={handleUserInput}
          className="bg-white h-[4rem] border-t px-4 flex items-center justify-center gap-x-2 fixed left-0 bottom-0 w-full shadow-md z-10"
        >
          <Input
            type="text"
            placeholder="Enter your answer e.g. 'A'"
            className="max-w-3xl focus-visible:outline-none focus-visible:ring-0 border-slate-400"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button type="submit">Submit</Button>
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium">
              {questionIndex}/{questionList.length}
            </span>
          </div>
        </form>
      </div>
      <QuizScore quizId={quizId} open={quizScore} setOpen={showQuizScore} />
    </ScrollArea>
  );
}

/*
{
  id: feedbackId,
  questionId: abc,
  userId: 123,
  response: good | bad,
  reasons: "I didn't understand the question",
  createdAt: timestamp,
}
*/
