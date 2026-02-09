// src/entities/session/model/store.ts
import { create } from "zustand";
import { type QuizSessionStore } from "./types";

export const useQuizSessionStore = create<QuizSessionStore>((set) => ({
  score: 0,
  questionIndex: 0,
  answeredQuestions: 0,
  isQuizOver: false,

  incrementScore: () => set((state) => { console.log('incrementScore called'); return { score: state.score + 1 }; }),
  incrementQuestionIndex: () =>
    set((state) => ({ questionIndex: state.questionIndex + 1 })),
  incrementAnsweredQuestions: () =>
    set((state) => ({ answeredQuestions: state.answeredQuestions + 1 })),
  setQuizOver: (isOver: boolean) => set(() => ({ isQuizOver: isOver })),
  resetSession: () =>
    set(() => ({
      score: 0,
      questionIndex: 0,
      answeredQuestions: 0,
      isQuizOver: false,
    })),
}));
