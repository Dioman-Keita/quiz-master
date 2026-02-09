// src/pages/home/ui/home-page.tsx
import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { ConfigForm } from "@features/quiz-config/ui/config-form";
import { LayoutHeader } from "@widgets/layout-header";
import { Typography } from "@shared/ui/typography";

interface HomePageProps {
  onStartQuiz: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartQuiz }) => {
  const { t } = useTranslation(); // Initialize useTranslation
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <LayoutHeader />
      <main className="flex flex-col items-center justify-center space-y-8 grow animate-fade-in">
        <Typography
          variant="h1"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center"
        >
          {t("common.title")} {/* Use translation key */}
        </Typography>
        <ConfigForm onStartQuiz={onStartQuiz} />
      </main>
    </div>
  );
};
