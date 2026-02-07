// src/entities/session/lib/score-logic.test.ts
import { checkAnswer } from './score-logic';
import { useQuizSessionStore } from '../model/store';
import { act } from 'react'; // For Zustand state updates in tests

describe('score-logic', () => {
  const initialState = useQuizSessionStore.getState();

  beforeEach(() => {
    // Reset Zustand store to initial state before each test
    act(() => {
      useQuizSessionStore.setState(initialState, true); // true for replace
    });
  });

  it('should increment score and answered questions when the answer is correct', () => {
    const correctAnswer = 'Correct Answer';
    const selectedAnswer = 'Correct Answer';

    const isCorrect = checkAnswer(selectedAnswer, correctAnswer);

    expect(isCorrect).toBe(true);
    expect(useQuizSessionStore.getState().score).toBe(1);
    expect(useQuizSessionStore.getState().answeredQuestions).toBe(1);
  });

  it('should only increment answered questions when the answer is incorrect', () => {
    const correctAnswer = 'Correct Answer';
    const selectedAnswer = 'Wrong Answer';

    const isCorrect = checkAnswer(selectedAnswer, correctAnswer);

    expect(isCorrect).toBe(false);
    expect(useQuizSessionStore.getState().score).toBe(0); // Score should not change
    expect(useQuizSessionStore.getState().answeredQuestions).toBe(1);
  });

  it('should handle multiple answers correctly', () => {
    const correctAnswer1 = 'A';
    const selectedAnswer1 = 'A'; // Correct

    const correctAnswer2 = 'B';
    const selectedAnswer2 = 'C'; // Incorrect

    act(() => {
      checkAnswer(selectedAnswer1, correctAnswer1);
    });
    act(() => {
      checkAnswer(selectedAnswer2, correctAnswer2);
    });

    expect(useQuizSessionStore.getState().score).toBe(1);
    expect(useQuizSessionStore.getState().answeredQuestions).toBe(2);
  });
});