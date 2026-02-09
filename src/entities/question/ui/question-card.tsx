// src/entities/question/ui/question-card.tsx
import React from "react";
import type { Question } from "../model/types";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { Typography } from "@shared/ui/typography";
import { useTranslation } from "react-i18next";
import { useTranslatedQuestion } from "@features/hooks/use-translated-question";
interface QuestionCardProps {
  question: Question;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  onAnswerSelected: (answer: string) => void;
  selectedAnswer: string | null;
  correctAnswer: string | null; // This should ideally come from useTranslatedQuestion now
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isLoading,
  isError,
  error,
  onAnswerSelected,
  selectedAnswer,
  correctAnswer: originalCorrectAnswer, // Rename to avoid conflict
}) => {
  const { t } = useTranslation();
  const { translatedQuestion, isTranslating, translationError } =
    useTranslatedQuestion(question);

  const currentQuestionToDisplay = translatedQuestion || question;
  const currentCorrectAnswer =
    translatedQuestion?.correctAnswer || originalCorrectAnswer;

  if (isLoading || isTranslating) {
    return (
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>
            {isLoading
              ? t("feedback.loading_question")
              : t("feedback.translating_question")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            {isLoading
              ? t("feedback.fetching_question_wait")
              : t("feedback.translation_in_progress")}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (isError || translationError) {
    return (
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-red-500">{t("feedback.error")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            {t("feedback.failed_to_load_question", {
              error: error || translationError,
            })}
          </Typography>
          <Typography variant="p">{t("feedback.try_again_later")}</Typography>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestionToDisplay) {
    return (
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{t("feedback.no_question_available")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            {t("feedback.could_not_retrieve_question")}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const getButtonClass = (option: string) => {
    if (selectedAnswer === null) {
      return ""; // No answer selected yet
    }
    // If an answer is selected, apply feedback
    if (option === currentCorrectAnswer) {
      return "bg-green-500 text-white animate-correct-answer"; // Correct answer
    }
    if (option === selectedAnswer) {
      return "bg-red-500 text-white animate-incorrect-answer"; // Incorrectly selected answer
    }
    return "opacity-50"; // Other unselected options fade out
  };

  return (
    <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto bg-gray-800 text-white shadow-xl rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center" aria-live="polite">
          <Typography variant="h4">
            {decodeURIComponent(currentQuestionToDisplay.question)}
          </Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentQuestionToDisplay.options.map((option, index) => (
          <Button
            key={index}
            className={`w-full py-3 rounded-md transition-all duration-200 ease-in-out
              ${getButtonClass(option)}
              ${selectedAnswer ? "cursor-not-allowed" : "hover:bg-gray-700 bg-gray-600 hover:scale-[1.02]"}
            `}
            onClick={() => !selectedAnswer && onAnswerSelected(option)}
            disabled={selectedAnswer !== null}
          >
            <Typography variant="p" className="text-left grow">
              {decodeURIComponent(option)}
            </Typography>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
