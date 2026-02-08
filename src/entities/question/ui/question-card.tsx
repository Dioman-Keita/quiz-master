// src/entities/question/ui/question-card.tsx
import React from "react";
import type { Question } from "../model/types";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { Typography } from "@shared/ui/typography";

interface QuestionCardProps {
  question: Question;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  onAnswerSelected: (answer: string) => void;
  selectedAnswer: string | null;
  correctAnswer: string | null;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isLoading,
  isError,
  error,
  onAnswerSelected,
  selectedAnswer,
  correctAnswer,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Loading Question...</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            Please wait while we fetch the next question.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="p">Failed to load question: {error}</Typography>
          <Typography variant="p">Please try again later.</Typography>
        </CardContent>
      </Card>
    );
  }

  if (!question) {
    return (
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>No Question Available</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="p">
            We could not retrieve a question at this time.
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
    if (option === correctAnswer) {
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
            {decodeURIComponent(question.question)}
          </Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.options.map((option, index) => (
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
