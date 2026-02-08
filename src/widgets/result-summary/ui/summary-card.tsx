// src/widgets/result-summary/ui/summury-card.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import { Typography } from '@shared/ui/typography';

interface SummaryCardProps {
  score: number;
  totalQuestions: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ score, totalQuestions }) => {
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  return (
    <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto bg-gray-800 text-white shadow-xl rounded-lg p-6 text-center">
      <CardHeader>
        <CardTitle>
          <Typography variant="h3">Quiz Complete!</Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Typography variant="p">Your final score is:</Typography>
        <Typography variant="h1" className="font-bold text-5xl">
          {score} / {totalQuestions}
        </Typography>
        <Typography variant="h4" className="font-bold">
          ({percentage.toFixed(2)}%)
        </Typography>
      </CardContent>
    </Card>
  );
};
