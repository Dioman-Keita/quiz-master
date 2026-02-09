// src/widgets/quiz-board/ui/quiz-board.tsx
import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { QuizTimer } from "@features/quiz-timer";
import { QuestionCard } from "@entities/question/ui/question-card";
import { fetchQuestions } from "@entities/question/api/fetch-question";
import type { Question, QuestionState } from "@entities/question/model/types";
import { Typography } from "@shared/ui/typography";
import { Button } from "@shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { useQuizSessionStore } from "@entities/session/model/store";
import { checkAnswer } from "@entities/session/lib/score-logic";

export const QuizBoard: React.FC = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const [questionState, setQuestionState] = useState<QuestionState>({
    data: null,
    isLoading: true,
    isError: false,
    error: null,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(
    null,
  );
  // Using a key to force QuizTimer re-render and reset internal state
  const [timerKey, setTimerKey] = useState(0);

  // Get score, reset function, and quiz over state from store
  const { score, resetSession, incrementQuestionIndex, isQuizOver, setQuizOver } = useQuizSessionStore();

  const getQuestion = useCallback(async () => {
    if (isQuizOver) return; // Do not fetch new questions if quiz is over

    setQuestionState((prevState: QuestionState) => ({
      ...prevState,
      isLoading: true,
      isError: false,
      error: null,
    }));
    setSelectedAnswer(null);
    setAnsweredCorrectly(null);
    setTimerKey((prevKey) => prevKey + 1); // Reset timer for new question

    const result = await fetchQuestions(1);
    setQuestionState(result);
    setCurrentQuestion(result.data);
  }, [isQuizOver]);

  useEffect(() => {
    getQuestion();
    resetSession(); // Reset session when game page mounts initially
  }, [getQuestion, resetSession]);

  const handleAnswerSelected = (answer: string) => {
    if (!currentQuestion || selectedAnswer !== null || isQuizOver) return;

    setSelectedAnswer(answer);
    const correct = checkAnswer(answer, currentQuestion.correctAnswer);
    setAnsweredCorrectly(correct);
    incrementQuestionIndex();

    setTimeout(() => {
      getQuestion();
    }, 1500);
  };

  const handleTimerEnd = useCallback(() => {
    setQuizOver(true);
    // Potentially navigate to results page here
  }, [setQuizOver]);

  const handlePlayAgain = () => {
    resetSession();
    setQuizOver(false); // Reset quiz over state
    getQuestion();
  };

  return (
    <div className="w-full max-w-2xl">
        <Typography variant="h2" className="mb-8">
          {t("common.play")}
        </Typography>
        <div className="mb-4 text-lg font-semibold">
          {t("common.score")}: {score}
        </div>
        <div className="mb-6">
          {!isQuizOver ? (
            <QuizTimer
              key={timerKey} // Key to force re-render and reset
              totalTime={30}
              onTimerEnd={handleTimerEnd}
            />
          ) : (
            <Typography variant="h3" className="text-red-500">
              {t("feedback.times_up")}
            </Typography>
          )}
        </div>

        {isQuizOver ? (
          <div className="text-center">
            <Typography variant="h4" className="mb-4">
              {t("feedback.quiz_over_score", { score })}
            </Typography>
            <Button onClick={handlePlayAgain} className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-all duration-200 ease-in-out hover:scale-[1.02]">
              {t("common.try_again")}
            </Button>
          </div>
        ) : (
          <>
            {questionState.isLoading && (
              <Card className="w-87.5 mx-auto">
                <CardHeader>
                  <CardTitle>{t("feedback.loading_question")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Typography variant="p">
                    {t("feedback.fetching_question_wait")}
                  </Typography>
                </CardContent>
              </Card>
            )}

            {questionState.isError && (
              <Card className="w-87.5 mx-auto">
                <CardHeader>
                  <CardTitle className="text-red-500">{t("feedback.error")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Typography variant="p">
                    {t("feedback.failed_to_load_question", { error: questionState.error })}
                  </Typography>
                  <Typography variant="p">
                    {t("feedback.try_again_later")}
                  </Typography>
                </CardContent>
              </Card>
            )}

            {!questionState.isLoading &&
              !questionState.isError &&
              !currentQuestion && (
                <Card className="w-87.5 mx-auto">
                  <CardHeader>
                    <CardTitle>{t("feedback.no_question_available")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="p">
                      {t("feedback.could_not_retrieve_question")}
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
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-200 ease-in-out hover:scale-[1.02]"
              >
                {t("feedback.retry_fetching_question")}
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
                    {answeredCorrectly ? t("feedback.correct_answer") : t("feedback.wrong_answer", { correctAnswer: currentQuestion?.correctAnswer })}
                  </Typography>
                )}
                <Button
                  onClick={getQuestion}
                  className="mt-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-all duration-200 ease-in-out hover:scale-[1.02]"
                >
                  {t("common.next_question")}
                </Button>
              </div>
            )}

            {questionState.data &&
              !questionState.isLoading &&
              selectedAnswer === null && (
                <Typography variant="small" className="mt-4 text-gray-400">
                  {t("feedback.select_answer")}
                </Typography>
              )}
          </>
        )}
    </div>
  );
};
