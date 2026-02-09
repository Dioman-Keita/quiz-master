// src/entities/question/api/fetch-question.ts
import type { Question, QuestionState } from "../model/types";
import { useQuizConfigStore } from "@features/quiz-config/model/config-hooks"; // Import the store

// This would typically come from environment variables or a config file
const API_BASE_URL = "https://opentdb.com/api.php";

// Cache configuration
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

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
  amount: number = 10,
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
      console.log("Force refresh requested, clearing cache for key:", cacheKey);
      sessionStorage.removeItem(cacheKey);
    } else if (cachedDataString) {
      const cachedData: CachedQuestionData = JSON.parse(cachedDataString);
      if (Date.now() - cachedData.timestamp < CACHE_DURATION_MS) {
        console.log("Fetching questions from cache for key:", cacheKey);
        state = {
          data: cachedData.questions,
          isLoading: false,
          isError: false,
          error: null,
        };
        return state;
      } else {
        console.log("Cached questions expired for key:", cacheKey);
        sessionStorage.removeItem(cacheKey); // Remove stale cache
      }
    }

    // 2. If not in cache or expired, proceed with API fetch
    console.log("Fetching questions from API for key:", cacheKey);
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
    } else {
      console.warn(
        `API returned ${questions.length} questions, but ${amount} were requested. Not caching partial response.`,
      );
    }

    state = {
      data: questions.length > 0 ? questions : null,
      isLoading: false,
      isError: false,
      error: null,
    };
  } catch (error: any) {
    console.error("Failed to fetch questions:", error);
    state = {
      data: null,
      isLoading: false,
      isError: true,
      error: error.message || "Failed to fetch questions",
    };
  } finally {
    return state;
  }
};
