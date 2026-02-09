// src/entities/question/api/fetch-question.ts
import type { Question, QuestionState } from "../model/types";
import { useQuizConfigStore } from "@features/quiz-config/model/config-hooks"; // Import the store

// This would typically come from environment variables or a config file
const API_BASE_URL = "https://opentdb.com/api.php";

// Cache configuration
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const DEFAULT_QUIZ_LENGTH = 10;

interface CachedQuestionData {
  timestamp: number;
  questions: Question[];
}

const getCacheKey = (
  amount: number,
  categoryId: string | undefined,
  difficulty: string | undefined,
): string => {
  return `quiz_questions_${amount}_${categoryId || "any"}_${difficulty || "any"}`;
};

export const fetchQuestions = async (
  amount: number = DEFAULT_QUIZ_LENGTH,
  forceRefresh: boolean = false,
): Promise<QuestionState> => {
  // Get category and difficulty from the store
  const { category, difficulty } = useQuizConfigStore.getState();
  const categoryId = typeof category === "object" ? category.id : undefined;

  const url =
    `${API_BASE_URL}?amount=${amount}&type=multiple` +
    (difficulty ? `&difficulty=${difficulty}` : "") +
    (categoryId ? `&category=${categoryId}` : "");

  const cacheKey = getCacheKey(amount, categoryId, difficulty);

  let state: QuestionState = {
    data: null,
    isLoading: true,
    isError: false,
    error: null,
  };

  try {
    // 1. Try to retrieve from cache
    const cachedDataString = sessionStorage.getItem(cacheKey);

    if (forceRefresh) {
      sessionStorage.removeItem(cacheKey);
    } else if (cachedDataString) {
      try {
        const cachedData: CachedQuestionData = JSON.parse(cachedDataString);
        if (Date.now() - cachedData.timestamp < CACHE_DURATION_MS) {
          state = {
            data: cachedData.questions,
            isLoading: false,
            isError: false,
            error: null,
          };
          return state;
        } else {
          sessionStorage.removeItem(cacheKey); // Remove stale cache
        }
      } catch (parseError) {
        // Corrupt cache data - remove it and proceed to fresh fetch
        sessionStorage.removeItem(cacheKey);
      }
    }

    // 2. If not in cache or expired, proceed with API fetch
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();

    if (result.response_code === 1) {
      // Open Trivia DB specific response code for no results
      throw new Error(
        "No questions found for the selected criteria. Please try different options.",
      );
    }
    if (result.response_code === 2) {
      // Open Trivia DB specific response code for invalid parameter
      throw new Error("Invalid parameters in the question request.");
    }
    if (result.response_code === 3) {
      // Token not found, typically for session tokens
      throw new Error("Open Trivia DB session token not found or invalid.");
    }
    if (result.response_code === 4) {
      // Token empty, typically for session tokens
      throw new Error(
        "Open Trivia DB session token is empty. Please reset it.",
      );
    }

    const questions: Question[] = result.results.map(
      (item: any, index: number) => ({
        id: `${item.category}-${index}-${Date.now()}-${Math.random()}`, // More unique ID
        question: item.question,
        options: [...item.incorrect_answers, item.correct_answer].sort(
          () => Math.random() - 0.5,
        ), // Shuffle options
        correctAnswer: item.correct_answer,
        difficulty: item.difficulty,
        category: item.category,
      }),
    );

    // Store in cache ONLY if the number of questions matches the requested amount
    if (questions.length === amount) {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), questions }),
      );
    }

    state = {
      data: questions.length > 0 ? questions : null,
      isLoading: false,
      isError: false,
      error: null,
    };
  } catch (error: any) {
    // Map internal errors to user-friendly messages
    let userMessage = "Unable to load questions. Please try again.";

    if (error.message?.includes("No questions found")) {
      userMessage =
        "No questions available for this category. Please try different options.";
    } else if (error.message?.includes("HTTP error")) {
      userMessage =
        "Network error. Please check your connection and try again.";
    }

    state = {
      data: null,
      isLoading: false,
      isError: true,
      error: userMessage,
    };
  } finally {
    return state;
  }
};
