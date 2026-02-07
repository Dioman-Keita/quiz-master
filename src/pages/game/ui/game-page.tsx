// src/pages/game/ui/game-page.tsx
import React, { useEffect, useState, useCallback } from "react";
import { LayoutHeader } from "@widgets/layout-header";
import { QuizTimer } from "@features/quiz-timer"; // Assuming QuizTimer exists
import { QuestionCard } from "@entities/question/ui/question-card";
import { fetchQuestions } from "@entities/question/api/fetch-question";
import type { Question, QuestionState } from "@entities/question/model/types";
import { Typography } from "@shared/ui/typography";
import { Button } from "@shared/ui/button"; // Assuming button for retry
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { useQuizSessionStore } from "@entities/session/model/store"; // Import session store
import { checkAnswer } from "@entities/session/lib/score-logic"; // Import score logic

export const GamePage: React.FC = () => {
  const [questionState, setQuestionState] = useState<QuestionState>({
    data: null,
    isLoading: true,
    isError: false,
    error: null,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null); // To manage current question in UI
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(
    null,
  );

  // Get score and reset function from store
  const { score, resetSession, incrementQuestionIndex } = useQuizSessionStore();

  const getQuestion = useCallback(async () => {
    setQuestionState((prevState: QuestionState) => ({
      ...prevState,
      isLoading: true,
      isError: false,
      error: null,
    }));
    setSelectedAnswer(null); // Reset selected answer for new question
    setAnsweredCorrectly(null); // Reset answer status

    const result = await fetchQuestions(1); // Fetch 1 question at a time
    setQuestionState(result);
    setCurrentQuestion(result.data); // Set the fetched question as current
  }, []);

  useEffect(() => {
    getQuestion();
    // Reset session when game page mounts initially
    resetSession();
  }, [getQuestion, resetSession]);

  const handleAnswerSelected = (answer: string) => {
    if (!currentQuestion || selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const correct = checkAnswer(answer, currentQuestion.correctAnswer);
    setAnsweredCorrectly(correct);
    incrementQuestionIndex(); // Increment question index after answering

    // Automatically advance to next question after a short delay
    setTimeout(() => {
      getQuestion();
    }, 1500); // 1.5 second delay
  };

  const handleNextQuestion = () => {
    // This function will now primarily be used for immediate advancement if desired,
    // otherwise handleAnswerSelected takes care of the delay.
    getQuestion();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <LayoutHeader />
      <main className="grow flex flex-col items-center justify-center p-4">
        <Typography variant="h2" className="mb-8">
          Quiz Time!
        </Typography>
        <div className="mb-4 text-lg font-semibold">
          Score: {score}
        </div>
        <div className="mb-6">
          {/* Assuming QuizTimer display goes here */}
          <QuizTimer
            totalTime={30}
            onTimerEnd={() => console.log("Timer ended!")}
          />
        </div>

        {questionState.isLoading && (
          <Card className="w-87.5 mx-auto">
            <CardHeader>
              <CardTitle>Loading Question...</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography variant="p">
                Please wait while we fetch the next question.
              </Typography>
            </CardContent>
          </Card>
        )}

        {questionState.isError && (
          <Card className="w-87.5 mx-auto">
            <CardHeader>
              <CardTitle className="text-red-500">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography variant="p">
                Failed to load question: {questionState.error}
              </Typography>
              <Typography variant="p">Please try again later.</Typography>
            </CardContent>
          </Card>
        )}

        {!questionState.isLoading &&
          !questionState.isError &&
          !currentQuestion && (
            <Card className="w-87.5 mx-auto">
              <CardHeader>
                <CardTitle>No Question Available</CardTitle>
              </CardHeader>
              <CardContent>
                <Typography variant="p">
                  We could not retrieve a question at this time.
                </Typography>
              </CardContent>
            </Card>
          )}

        {!questionState.isLoading &&
          !questionState.isError &&
          currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              onAnswerSelected={handleAnswerSelected}
              selectedAnswer={selectedAnswer}
              correctAnswer={currentQuestion?.correctAnswer || null}
              isLoading={questionState.isLoading}
              isError={questionState.isError}
              error={questionState.error}
            />
          )}

        {questionState.isError && (
          <Button
            onClick={getQuestion}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Retry Fetching Question
          </Button>
        )}

        {selectedAnswer !== null && (
          <div className="mt-4 text-center">
            {answeredCorrectly !== null && (
              <Typography
                variant="p"
                className={
                  answeredCorrectly ? "text-green-400" : "text-red-400"
                }
              >
                {answeredCorrectly ? "Correct!" : "Incorrect!"}
              </Typography>
            )}
            <Button
              onClick={handleNextQuestion}
              className="mt-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md"
            >
              Next Question
            </Button>
          </div>
        )}

        {questionState.data &&
          !questionState.isLoading &&
          selectedAnswer === null && (
            <Typography variant="small" className="mt-4 text-gray-400">
              Select an answer above.
            </Typography>
          )}
      </main>
    </div>
  );
};
