// src/features/quiz-config/model/types.ts

export type QuizDifficulty = 'easy' | 'medium' | 'hard' | ''; // '' for 'any'
export type QuizCategory = { id: string; name: string } | ''; // '' for 'any'

export interface QuizConfigState {
  category: QuizCategory;
  difficulty: QuizDifficulty;
}

export interface QuizConfigActions {
  setCategory: (category: QuizCategory) => void;
  setDifficulty: (difficulty: QuizDifficulty) => void;
  resetConfig: () => void;
}

export type QuizConfigStore = QuizConfigState & QuizConfigActions;