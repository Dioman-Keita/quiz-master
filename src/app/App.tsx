// src/app/App.tsx
import React, { useState } from 'react';
import { HomePage } from '@pages/home';
import { GamePage } from '@pages/game';
import { ResultPage } from '@pages/result';
import { useQuizSessionStore } from '@entities/session/model/store';

type Page = 'home' | 'game' | 'result';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { isQuizOver } = useQuizSessionStore();

  const handleStartQuiz = () => {
    setCurrentPage('game');
  };

  const handlePlayAgain = () => {
    setCurrentPage('home');
  };

  const handleQuizEnd = () => {
    setCurrentPage('result');
  };

  // This is a simple router. A more robust solution would use a library like react-router-dom.
  // We also need to decide where the logic for page navigation lives.
  // For now, we'll check the quiz state to decide which page to render.
  
  // This effect will automatically navigate to the result page when the quiz is over.
  React.useEffect(() => {
    if (isQuizOver) {
      handleQuizEnd();
    }
  }, [isQuizOver]);

  switch (currentPage) {
    case 'game':
      return <GamePage />;
    case 'result':
      return <ResultPage onPlayAgain={handlePlayAgain} />;
    case 'home':
    default:
      return <HomePage onStartQuiz={handleStartQuiz} />;
  }
}

export default App;