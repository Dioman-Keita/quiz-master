// src/widgets/quiz-board/ui/quiz-board.tsx
import React, { useEffect, useState, useCallback, useRef } from "react"; // Import useRef
import { useTranslation } from "react-i18next";
import { QuizTimer } from "@features/quiz-timer";
import { QuestionCard } from "@entities/question/ui/question-card";
import { fetchQuestions } from "@entities/question/api/fetch-question";
import type { Question, QuestionState } from "@entities/question/model/types";
import { Typography } from "@shared/ui/typography";
import { Button } from "@shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { useQuizSessionStore } from "@entities/session/model/store";
import { SummaryCard } from "@widgets/result-summary/ui/summary-card";
import { checkAnswer } from "@entities/session/lib/score-logic";

const QUIZ_LENGTH = 10;

export const QuizBoard: React.FC = () => {
  const { t } = useTranslation();
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
  const [timerKey, setTimerKey] = useState(0);
  const answeredRef = useRef(false); // New useRef for Issue 1
  const [hasInitialQuestionFetched, setHasInitialQuestionFetched] =
    useState(false); // New state for API rate limit fix
  const [quizEndReason, setQuizEndReason] = useState<
    "timeout" | "completed" | null
  >(null);
  const [isTimerPaused, setIsTimerPaused] = useState(false); // New state for Problem 3

  const {
    score,
    resetSession,
    incrementQuestionIndex,
    incrementScore,
    incrementAnsweredQuestions,
    isQuizOver,
    setQuizOver,
    questionIndex,
  } = useQuizSessionStore();

  const getQuestion = useCallback(
    async (refresh = false) => {
      if (isQuizOver) return;

      setIsTimerPaused(false); // Resume timer for new question (Problem 3)

      const currentQuestions = questionState.data;
      if (
        !refresh &&
        currentQuestions &&
        currentQuestions.length > questionIndex
      ) {
        setCurrentQuestion(currentQuestions[questionIndex]);
        setSelectedAnswer(null);
        setAnsweredCorrectly(null);
        setTimerKey((prevKey) => prevKey + 1);
        answeredRef.current = false;
        return;
      }

      setQuestionState((prevState: QuestionState) => ({
        ...prevState,
        isLoading: true,
        isError: false,
        error: null,
      }));
      setSelectedAnswer(null);
      setAnsweredCorrectly(null);
      setTimerKey((prevKey) => prevKey + 1);
      answeredRef.current = false;

      const result = await fetchQuestions(QUIZ_LENGTH, refresh);

      setQuestionState(result);
      if (result.data) {
        const qIndex = refresh ? 0 : questionIndex;
        if (result.data[qIndex]) {
          setCurrentQuestion(result.data[qIndex]);
        } else {
          setCurrentQuestion(result.data[0]);
        }
      } else {
        setCurrentQuestion(null);
      }
    },
    [isQuizOver, setQuizOver, questionState.data, questionIndex],
  );

  // startNewQuiz now forces fresh questions from API
  const startNewQuiz = useCallback(() => {
    getQuestion(true);
  }, [getQuestion]);

  useEffect(() => {
    if (!currentQuestion && !isQuizOver && !hasInitialQuestionFetched) {
      startNewQuiz();
      setHasInitialQuestionFetched(true);
    }
  }, [currentQuestion, isQuizOver, hasInitialQuestionFetched, startNewQuiz]);

  const handleAnswerSelected = (answer: string) => {
    if (
      !currentQuestion ||
      selectedAnswer !== null ||
      isQuizOver ||
      answeredRef.current
    )
      return;

    answeredRef.current = true;
    setIsTimerPaused(true); // Pause timer when answer is selected (Problem 3)
    setSelectedAnswer(answer);
    const correct = checkAnswer(answer, currentQuestion.correctAnswer);
    setAnsweredCorrectly(correct);

    // Debugging for Problem 1
    console.log(
      "handleAnswerSelected: correct =",
      correct,
      "score before =",
      score,
    );
    if (correct) {
      incrementScore();
      console.log("handleAnswerSelected: incrementScore called");
    } else {
      console.log(
        "handleAnswerSelected: answer incorrect, score not incremented",
      );
    }
    console.log(
      "handleAnswerSelected: score after (check next render) =",
      useQuizSessionStore.getState().score,
    );

    incrementQuestionIndex();
    incrementAnsweredQuestions();

    const batchSize = questionState.data?.length || QUIZ_LENGTH;
    const nextIndex = questionIndex + 1;

    if (nextIndex >= batchSize) {
      setQuizEndReason("completed");
      setQuizOver(true);
    }
  };

  const handleTimerEnd = useCallback(() => {
    setQuizEndReason("timeout");
    setQuizOver(true);
    setIsTimerPaused(true); // Ensure timer is paused if it ends naturally (Problem 3)
  }, [setQuizOver]);

  const handlePlayAgain = () => {
    resetSession();
    setQuizOver(false);
    setQuizEndReason(null);
    setHasInitialQuestionFetched(false);
    setIsTimerPaused(false); // Unpause timer for new quiz (Problem 3)
    getQuestion(true);
  };

  const handleNextQuestion = () => {
    getQuestion(false);
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
        {!isQuizOver && !questionState.isError ? (
          <QuizTimer
            key={timerKey}
            totalTime={30}
            onTimerEnd={handleTimerEnd}
            isPaused={isTimerPaused} // Pass isPaused to QuizTimer (Problem 3)
          />
        ) : isQuizOver && quizEndReason === "timeout" ? (
          <Typography variant="h3" className="text-red-500">
            {t("feedback.times_up")}
          </Typography>
        ) : isQuizOver && quizEndReason === "completed" ? (
          <Typography variant="h3" className="text-green-500">
            {t("feedback.quiz_complete")}
          </Typography>
        ) : questionState.isError ? (
          <Typography variant="h3" className="text-red-500">
            {t("feedback.error")}
          </Typography>
        ) : null}
      </div>

      {isQuizOver ? (
        <div className="text-center">
          <SummaryCard
            score={score}
            totalQuestions={questionState.data?.length || QUIZ_LENGTH}
          />
          <Button
            onClick={handlePlayAgain}
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-all duration-200 ease-in-out hover:scale-[1.02]"
          >
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
                <CardTitle className="text-red-500">
                  {t("feedback.error")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Typography variant="p">
                  {questionState.error || t("feedback.failed_to_load_question")}
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
              onClick={() => getQuestion(true)}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-200 ease-in-out hover:scale-[1.02]"
            >
              {t("feedback.retry_fetching_question")}
            </Button>
          )}

          {selectedAnswer !== null && (
            <div className="mt-4 text-center">
              {answeredCorrectly === false && ( // Only show feedback if answer was incorrect (Problem 2)
                <Typography
                  variant="p"
                  className={"text-red-400"} // Class name is always red for incorrect feedback (Problem 2)
                >
                  {t("feedback.wrong_answer", {
                    // Only show wrong answer feedback (Problem 2)
                    correctAnswer: currentQuestion?.correctAnswer,
                  })}
                </Typography>
              )}
              <Button
                onClick={handleNextQuestion}
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
