// src/widgets/result-summary/ui/summury-card.tsx
import React from 'react';
import { useTranslation } from "react-i18next"; // Import useTranslation
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import { Typography } from '@shared/ui/typography';

interface SummaryCardProps {
  score: number;
  totalQuestions: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ score, totalQuestions }) => {
  const { t } = useTranslation(); // Initialize useTranslation
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  return (
    <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto bg-gray-800 text-white shadow-xl rounded-lg p-6 text-center">
      <CardHeader>
        <CardTitle>
          <Typography variant="h3">{t("feedback.quiz_complete")}</Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Typography variant="p">{t("feedback.your_final_score_is")}</Typography>
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
