// src/features/quiz-config/ui/config-form.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { Typography } from "@shared/ui/typography";
import { useQuizConfigStore } from "../model/config-hooks";
import type { QuizCategory, QuizDifficulty } from "../model/types";

interface ConfigFormProps {
  onStartQuiz: () => void;
}

// Hardcoded categories and difficulties for now
const difficulties: QuizDifficulty[] = ["", "easy", "medium", "hard"];
const hardcodedCategories: QuizCategory[] = [
  { id: "", name: "Any Category" },
  { id: "9", name: "General Knowledge" },
  { id: "10", name: "Books" },
  { id: "11", name: "Film" },
  { id: "12", name: "Music" },
  { id: "17", name: "Science & Nature" },
  { id: "18", name: "Science: Computers" },
];

export const ConfigForm: React.FC<ConfigFormProps> = ({ onStartQuiz }) => {
  const { t } = useTranslation(); // Initialize useTranslation
  const { category, difficulty, setCategory, setDifficulty } =
    useQuizConfigStore();
  const [availableCategories, _setAvailableCategories] =
    useState<QuizCategory[]>(hardcodedCategories);

  // Future improvement: Fetch categories dynamically
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     // Implement API call to get categories
  //     // setAvailableCategories(fetchedCategories);
  //   };
  //   fetchCategories();
  // }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedCat = availableCategories.find(
      (cat) => cat && cat.id === selectedId,
    );
    setCategory(selectedCat || "");
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value as QuizDifficulty);
  };

  return (
    <Card className="w-87.5 mx-auto bg-gray-800 text-white shadow-xl rounded-lg p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold mb-4">
          <Typography variant="h3">{t("common.settings")}</Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="category-select" className="block text-sm font-medium text-gray-300 mb-1">
            {t("common.select_category")}
          </label>
          <select
            id="category-select"
            aria-label={t("common.select_category")}
            value={typeof category === "object" ? category.id : category}
            onChange={handleCategoryChange}
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableCategories.map((cat) => (
              <option key={cat ? cat.id : ""} value={cat ? cat.id : ""}>
                {cat && cat.id === ""
                  ? t("category.any")
                  : cat && cat.name === "Science: Computers"
                    ? t("category.computers")
                    : cat && cat.name === "Science & Nature"
                      ? t("category.science_nature")
                      : cat
                        ? t(
                            `category.${cat.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
                          )
                        : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="difficulty-select" className="block text-sm font-medium text-gray-300 mb-1">
            {t("common.select_difficulty")}
          </label>
          <select
            id="difficulty-select"
            aria-label={t("common.select_difficulty")}
            value={difficulty}
            onChange={handleDifficultyChange}
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff === ""
                  ? t("difficulty.any")
                  : t(`difficulty.${diff}`)}
              </option>
            ))}
          </select>
        </div>

        <Button
          onClick={onStartQuiz}
          className="w-full py-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all duration-200 ease-in-out hover:scale-[1.02]"
        >
          <Typography variant="large">{t("common.start_quiz")}</Typography>
        </Button>
      </CardContent>
    </Card>
  );
};
