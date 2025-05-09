import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type QuizScore = {
  correct: number;
  total: number;
};

interface QuizState {
  currentQuizScore: QuizScore | null;
  setCurrentQuizScore: (score: QuizScore) => void;
  clearCurrentQuizScore: () => void;
}

const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      currentQuizScore: null,
      setCurrentQuizScore: (score) => set({ currentQuizScore: score }),
      clearCurrentQuizScore: () => set({ currentQuizScore: null }),
    }),
    {
      name: "quiz-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

export default useQuizStore;
