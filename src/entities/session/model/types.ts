// src/entities/session/model/types.ts

export interface QuizSessionState {
  score: number;
  questionIndex: number;
  answeredQuestions: number;
  isQuizOver: boolean;
  // Potentially add other state properties like quiz config (category, difficulty)
}

export interface QuizSessionActions {
  incrementScore: () => void;
  incrementQuestionIndex: () => void;
  incrementAnsweredQuestions: () => void;
  setQuizOver: (isOver: boolean) => void;
  resetSession: () => void;
}

export type QuizSessionStore = QuizSessionState & QuizSessionActions;