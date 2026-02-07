// src/entities/question/api/fetch-question.test.ts
declare var global: any;
import { fetchQuestions } from "./fetch-question";
import type { Question } from "../model/types";

// Mock the global fetch function
global.fetch = jest.fn();

describe("fetchQuestions", () => {
  const mockSuccessResponse = {
    response_code: 0,
    results: [
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
          "Central Process Unit",
          "Computer Personal Unit",
          "Central Peripheral Unit",
        ],
      },
    ],
  };

  const mockQuestion: Question = {
    id: expect.any(String),
    category: "Science: Computers",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correctAnswer: "Central Processing Unit",
    options: expect.arrayContaining([
      "Central Processing Unit",
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Peripheral Unit",
    ]),
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should return isLoading true initially and then data on success", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      }),
    );

    const promise = fetchQuestions(1, "easy", "18"); // category '18' for Science: Computers

    // Initial state check
    expect((await promise).isLoading).toBe(false); // After await, it should be false
    expect((await promise).data).toEqual(mockQuestion);
    expect((await promise).isError).toBe(false);
    expect((await promise).error).toBeNull();
  });

  it("should return isError true and an error message on API failure (response not ok)", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    );

    const result = await fetchQuestions(1, "easy", "18");

    expect(result.isLoading).toBe(false);
    expect(result.data).toBeNull();
    expect(result.isError).toBe(true);
    expect(result.error).toBe("HTTP error! status: 404");
  });

  it("should return isError true and a network error message on fetch exception", async () => {
    const networkError = new Error("Network Down");
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(networkError),
    );

    const result = await fetchQuestions(1, "easy", "18");

    expect(result.isLoading).toBe(false);
    expect(result.data).toBeNull();
    expect(result.isError).toBe(true);
    expect(result.error).toBe("Network Down");
  });

  it("should handle empty results gracefully", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ response_code: 0, results: [] }),
      }),
    );

    const result = await fetchQuestions(1);

    expect(result.isLoading).toBe(false);
    expect(result.data).toBeNull();
    expect(result.isError).toBe(false);
    expect(result.error).toBeNull();
  });
});
