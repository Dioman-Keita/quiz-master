// src/features/quiz-timer/ui/timer-display.tsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@shared/ui/typography';

interface QuizTimerProps {
  totalTime: number; // Time in seconds
  onTimerEnd: () => void;
}

export const QuizTimer: React.FC<QuizTimerProps> = ({ totalTime, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  // Use an effect to reset timeLeft when totalTime changes,
  // or when a key prop forces remount/reinitialization.
  // The key prop is handled by React's reconciliation, so `useState(totalTime)`
  // will re-initialize if the key changes.

  useEffect(() => {
    // This effect ensures timeLeft is reset if totalTime changes
    // without relying solely on the key prop remounting.
    setTimeLeft(totalTime);
  }, [totalTime]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerEnd();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId); // Cleanup on unmount or if timeLeft changes
  }, [timeLeft, onTimerEnd, totalTime]); // Added totalTime to dependency array

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center space-x-2">
      <Typography variant="h4" className="text-2xl font-bold">
        Time:
      </Typography>
      <Typography variant="h4" className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-green-500'}`}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </Typography>
    </div>
  );
};
