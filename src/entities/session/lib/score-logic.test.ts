// src/entities/session/lib/score-logic.test.ts
import { checkAnswer } from "./score-logic";
import { useQuizSessionStore } from "../model/store";
import { act } from "react"; // For Zustand state updates in tests

describe("score-logic", () => {
  const initialState = useQuizSessionStore.getState();

  beforeEach(() => {
    // Reset Zustand store to initial state before each test
    act(() => {
      useQuizSessionStore.setState(initialState, true); // true for replace
    });
  });

  it("should return true when the answer is correct", () => {
    const correctAnswer = "Correct Answer";
    const selectedAnswer = "Correct Answer";

    const isCorrect = checkAnswer(selectedAnswer, correctAnswer);

    expect(isCorrect).toBe(true);
    // Store should NOT be modified by checkAnswer anymore
    expect(useQuizSessionStore.getState().score).toBe(0);
    expect(useQuizSessionStore.getState().answeredQuestions).toBe(0);
  });

  it("should return false when the answer is incorrect", () => {
    const correctAnswer = "Correct Answer";
    const selectedAnswer = "Wrong Answer";

    const isCorrect = checkAnswer(selectedAnswer, correctAnswer);

    expect(isCorrect).toBe(false);
    expect(useQuizSessionStore.getState().score).toBe(0);
    expect(useQuizSessionStore.getState().answeredQuestions).toBe(0);
  });
});
