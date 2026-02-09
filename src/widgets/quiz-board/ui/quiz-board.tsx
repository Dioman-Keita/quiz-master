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
  // Removed hasAnsweredCurrentQuestion state, replaced by useRef
  const answeredRef = useRef(false); // New useRef for Issue 1

  const [hasInitialQuestionFetched, setHasInitialQuestionFetched] =
    useState(false); // New state for API rate limit fix

  const {
    score,
    resetSession, // Keep resetSession for handlePlayAgain, but remove from startNewQuiz
    incrementQuestionIndex,
    incrementScore,
    incrementAnsweredQuestions,
    isQuizOver,
    setQuizOver,
    questionIndex, // Added questionIndex
  } = useQuizSessionStore();

  const getQuestion = useCallback(
    async (refresh = false) => {
      if (isQuizOver) return;

      // Logic: If we have questions loaded and index is valid, just switch question
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
      answeredRef.current = false; // Reset useRef for new question (Issue 1)

      const result = await fetchQuestions(10, refresh);

      // Removed setQuizOver(true) here for API error handling (New Issue)
      setQuestionState(result);
      // When fetching new batch, typically we expect to start from index 0 or current index
      if (result.data) {
        const qIndex = refresh ? 0 : questionIndex;
        // Safety check
        if (result.data[qIndex]) {
          setCurrentQuestion(result.data[qIndex]);
        } else {
          // Fallback or error - if index out of bounds of new batch
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
    // Only call startNewQuiz if there's no question loaded and quiz is not over
    // and if the initial question for this component mount has not been fetched yet.
    if (!currentQuestion && !isQuizOver && !hasInitialQuestionFetched) {
      startNewQuiz();
      setHasInitialQuestionFetched(true); // Mark initial fetch as done
    }
  }, [currentQuestion, isQuizOver, hasInitialQuestionFetched, startNewQuiz]);

  const handleAnswerSelected = (answer: string) => {
    if (
      !currentQuestion ||
      selectedAnswer !== null ||
      isQuizOver ||
      answeredRef.current // Use useRef here (Issue 1)
    )
      return;

    answeredRef.current = true; // Set useRef to true immediately (Issue 1)
    setSelectedAnswer(answer);
    const correct = checkAnswer(answer, currentQuestion.correctAnswer);
    setAnsweredCorrectly(correct);

    if (correct) {
      incrementScore();
    }
    incrementQuestionIndex();
    incrementAnsweredQuestions();

    // Check if we've reached the end of the batch
    const batchSize = questionState.data?.length || 10;
    const nextIndex = questionIndex + 1;

    if (nextIndex >= batchSize) {
      // End of quiz - show summary
      setTimeout(() => {
        setQuizOver(true);
      }, 1500);
    } else {
      // More questions available - load next
      setTimeout(() => {
        getQuestion(false);
      }, 1500);
    }
  };

  const handleTimerEnd = useCallback(() => {
    setQuizOver(true);
  }, [setQuizOver]);

  const handlePlayAgain = () => {
    resetSession(); // Reset session when playing again (Issue 3)
    setQuizOver(false);
    setHasInitialQuestionFetched(false); // Allow a new initial fetch for the new quiz
    // We want fresh questions for a new game
    getQuestion(true);
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
        {/* Conditional render for timer (New Issue) */}
        {!isQuizOver && !questionState.isError ? (
          <QuizTimer
            key={timerKey}
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
          <SummaryCard
            score={score}
            totalQuestions={questionState.data?.length || 10}
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
                  {t("feedback.failed_to_load_question", {
                    error: questionState.error,
                  })}
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
              {answeredCorrectly !== null && (
                <Typography
                  variant="p"
                  className={
                    answeredCorrectly ? "text-green-400" : "text-red-400"
                  }
                >
                  {answeredCorrectly
                    ? t("feedback.correct_answer")
                    : t("feedback.wrong_answer", {
                        correctAnswer: currentQuestion?.correctAnswer,
                      })}
                </Typography>
              )}
              <Button
                onClick={() => getQuestion(false)}
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
