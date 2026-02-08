// src/pages/home/ui/home-page.tsx
import React from "react";
import { ConfigForm } from "@features/quiz-config/ui/config-form"; // Assuming ConfigForm is exported from index.ts
import { LayoutHeader } from "@widgets/layout-header";
import { Typography } from "@shared/ui/typography";

interface HomePageProps {
  onStartQuiz: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <LayoutHeader />
      <main className="flex flex-col items-center justify-center space-y-8 grow animate-fade-in">
        <Typography
          variant="h1"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center"
        >
          Quiz Master
        </Typography>
        <ConfigForm onStartQuiz={onStartQuiz} />
      </main>
    </div>
  );
};
