// src/features/quiz-timer/ui/timer-display.tsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@shared/ui/typography';

interface QuizTimerProps {
  totalTime: number; // Time in seconds
  onTimerEnd: () => void;
  isPaused: boolean; // New prop for pausing the timer
}

export const QuizTimer: React.FC<QuizTimerProps> = ({ totalTime, onTimerEnd, isPaused }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    setTimeLeft(totalTime);
  }, [totalTime]);

  useEffect(() => {
    if (isPaused) { // If paused, clear any existing interval and return
      return;
    }

    if (timeLeft <= 0) {
      onTimerEnd();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId); // Cleanup on unmount or if timeLeft changes
  }, [timeLeft, onTimerEnd, totalTime, isPaused]); // Add isPaused to dependency array

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const timerClass = `text-4xl font-extrabold ${
    timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-green-500'
  }`;

  return (
    <div className="flex items-center justify-center space-x-4">
      <Typography variant="h3" className="text-4xl font-extrabold">
        Time:
      </Typography>
      <Typography variant="h3" className={timerClass}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </Typography>
    </div>
  );
};
