// src/entities/question/api/fetch-question.ts
import { Question, QuestionState } from '../model/types';

// This would typically come from environment variables or a config file
const API_BASE_URL = 'https://opentdb.com/api.php';

export const fetchQuestions = async (
  amount: number = 10,
  difficulty?: 'easy' | 'medium' | 'hard',
  category?: string
): Promise<QuestionState> => {
  let url = `${API_BASE_URL}?amount=${amount}&type=multiple`;

  if (difficulty) {
    url += `&difficulty=${difficulty}`;
  }
  if (category) {
    // In a real application, you'd map category names to API IDs
    // For now, assume category is the ID or directly usable
    url += `&category=${category}`;
  }

  let state: QuestionState = {
    data: null,
    isLoading: true,
    isError: false,
    error: null,
  };

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    // Assuming the API returns an array of questions in result.results
    // and that 'correct_answer', 'incorrect_answers', 'question', 'category', 'difficulty' are present
    const questions: Question[] = result.results.map((item: any, index: number) => ({
      id: `${item.category}-${index}`, // Simple ID generation
      question: item.question,
      options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5), // Shuffle options
      correctAnswer: item.correct_answer,
      difficulty: item.difficulty,
      category: item.category,
    }));

    // For simplicity, let's return the first question for now as `data` is `Question | null`
    // In a real app, you might return an array or handle multiple questions differently
    state = {
      data: questions.length > 0 ? questions[0] : null,
      isLoading: false,
      isError: false,
      error: null,
    };
  } catch (error: any) {
    state = {
      data: null,
      isLoading: false,
      isError: true,
      error: error.message || 'Failed to fetch questions',
    };
  } finally {
    return state;
  }
};
