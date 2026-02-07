// src/entities/question/ui/question-card.tsx
import React from 'react';
import type { Question } from '../model/types';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import { Button } from '@shared/ui/button';
import { Typography } from '@shared/ui/typography';

interface QuestionCardProps {
  question: Question;
  onAnswerSelected: (answer: string) => void;
  selectedAnswer: string | null;
  correctAnswer: string | null;
  isLoading?: boolean;
  isError?: boolean;
  error?: string | null;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswerSelected,
  selectedAnswer,
  correctAnswer,
}) => {
  const getButtonClass = (option: string) => {
    if (selectedAnswer === null) {
      return ''; // No answer selected yet
    }
    if (option === correctAnswer) {
      return 'bg-green-500 hover:bg-green-600 text-white'; // Correct answer
    }
    if (option === selectedAnswer) {
      return 'bg-red-500 hover:bg-red-600 text-white'; // Incorrectly selected answer
    }
    return ''; // Other options
  };

  return (
    <Card className="w-[350px] mx-auto bg-gray-800 text-white shadow-xl rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          <Typography variant="h4">{decodeURIComponent(question.question)}</Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            className={`w-full py-3 rounded-md transition-colors duration-200
              ${getButtonClass(option)}
              ${selectedAnswer && option !== selectedAnswer && option !== correctAnswer ? 'opacity-50' : ''}
              ${selectedAnswer ? 'cursor-not-allowed' : 'hover:bg-gray-700 bg-gray-600'}
            `}
            onClick={() => !selectedAnswer && onAnswerSelected(option)}
            disabled={selectedAnswer !== null}
          >
            <Typography variant="p" className="text-left flex-grow">
              {decodeURIComponent(option)}
            </Typography>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};