// src/entities/question/model/types.ts

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
};

export type QuestionState = {
  data: Question[] | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
};
