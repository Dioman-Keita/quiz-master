// src/pages/game/ui/game-page.tsx
import React from "react";
import { LayoutHeader } from "@widgets/layout-header";
import { QuizBoard } from "@widgets/quiz-board/ui/quiz-board";

export const GamePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <LayoutHeader />
      <main className="grow flex flex-col items-center justify-center p-4 animate-fade-in">
        <QuizBoard />
      </main>
    </div>
  );
};
