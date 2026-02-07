// src/widgets/layout-header/ui/header.tsx
import React from 'react';
import { Typography } from '@shared/ui/typography';

export const LayoutHeader: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Typography variant="h3" className="text-xl font-bold">
          🧠 Quiz Master
        </Typography>
        {/* Potentially add navigation or user info here later */}
        <nav>
          {/* <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">About</a></li>
          </ul> */}
        </nav>
      </div>
    </header>
  );
};
