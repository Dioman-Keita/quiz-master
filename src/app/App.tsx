// src/app/App.tsx
import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { HomePage } from "@pages/home/ui/home-page";
import { GamePage } from "@pages/game/ui/game-page";
import { ResultPage } from "@pages/result/ui/result-page";
import { useQuizSessionStore } from "@entities/session/model/store";

type Page = "home" | "game" | "result";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const { isQuizOver, resetSession } = useQuizSessionStore(); // Import resetSession

  const handleStartQuiz = () => {
    resetSession(); // Reset session before starting a new quiz (Fix for Issue 3)
    setCurrentPage("game");
  };

  const handlePlayAgain = () => {
    setCurrentPage("home");
  };

  const handleQuizEnd = () => {
    setCurrentPage("result");
  };

  // This is a simple router. A more robust solution would use a library like react-router-dom.
  // We also need to decide where the logic for page navigation lives.
  // For now, we'll check the quiz state to decide which page to render.

  // This effect will automatically navigate to the result page when the quiz is over.
  React.useEffect(() => {
    if (isQuizOver) {
      handleQuizEnd();
    }
  }, [isQuizOver]); // Added handleQuizEnd to dependencies for completeness, though it's stable

  let pageContent;
  switch (currentPage) {
    case "game":
      pageContent = <GamePage />;
      break;
    case "result":
      pageContent = <ResultPage onPlayAgain={handlePlayAgain} />;
      break;
    case "home":
    default:
      pageContent = <HomePage onStartQuiz={handleStartQuiz} />;
  }

  return (
    <>
      {pageContent}
      <Analytics />
    </>
  );
}

export default App;
