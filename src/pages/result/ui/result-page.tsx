// src/pages/result/ui/result-page.tsx
import React from 'react';
import { LayoutHeader } from '@widgets/layout-header';
import { SummaryCard } from '@widgets/result-summary';
import { Button } from '@shared/ui/button';
import { useQuizSessionStore } from '@entities/session/model/store';
import { Typography } from '@shared/ui/typography';

interface ResultPageProps {
  onPlayAgain: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ onPlayAgain }) => {
  const { score, questions } = useQuizSessionStore();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <LayoutHeader />
      <main className="flex flex-col items-center justify-center space-y-8 flex-grow">
        <SummaryCard score={score} totalQuestions={questions.length} />
        <Button
          onClick={onPlayAgain}
          className="mt-8 px-6 py-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold"
        >
          <Typography variant="large">Play Again</Typography>
        </Button>
      </main>
    </div>
  );
};
