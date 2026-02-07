// src/features/quiz-config/model/config-hooks.ts
import { create } from 'zustand';
import { QuizConfigStore, QuizCategory, QuizDifficulty } from './types';

export const useQuizConfigStore = create<QuizConfigStore>((set) => ({
  category: '',
  difficulty: '',

  setCategory: (category: QuizCategory) => set(() => ({ category })),
  setDifficulty: (difficulty: QuizDifficulty) => set(() => ({ difficulty })),
  resetConfig: () =>
    set(() => ({
      category: '',
      difficulty: '',
    })),
}));