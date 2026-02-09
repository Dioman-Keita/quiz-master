// src/.llm/feature-add-french-support/hooks/use-translated-question.ts
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Question } from '@entities/question/model/types';
import { translateText } from '@shared/lib/translation-service';

interface TranslatedQuestionState {
  translatedQuestion: Question | null;
  isTranslating: boolean;
  translationError: string | null;
}

/**
 * Custom hook to translate a question and its options based on the current language.
 * Caches translations to avoid repeated API calls.
 *
 * @param question The original question object to translate.
 * @returns An object containing the translated question, translation loading state, and any error.
 */
export const useTranslatedQuestion = (question: Question | null): TranslatedQuestionState => {
  const { i18n } = useTranslation();
  const [translatedQuestion, setTranslatedQuestion] = useState<Question | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translationError, setTranslationError] = useState<string | null>(null);

  useEffect(() => {
    const translateCurrentQuestion = async () => {
      if (!question) {
        setTranslatedQuestion(null);
        return;
      }

      const targetLang = i18n.language;

      // If the target language is English, or question is already translated to the current language,
      // just set the original question as translated.
      // This is a simplistic check; a more robust one might involve storing the language of the 'translatedQuestion' state.
      if (targetLang === 'en') {
        setTranslatedQuestion(question);
        return;
      }

      setIsTranslating(true);
      setTranslationError(null);

      try {
        const translatedQuestionText = await translateText(question.question, targetLang);
        const translatedCategory = await translateText(question.category, targetLang);
        const translatedOptions = await Promise.all(
          question.options.map((option) => translateText(option, targetLang))
        );
        const translatedCorrectAnswer = await translateText(question.correctAnswer, targetLang);


        setTranslatedQuestion({
          ...question,
          question: translatedQuestionText,
          category: translatedCategory,
          options: translatedOptions,
          correctAnswer: translatedCorrectAnswer,
        });
      } catch (error: any) {
        console.error("Error translating question:", error);
        setTranslationError(error.message || "Failed to translate question.");
        setTranslatedQuestion(question); // Fallback to original question on error
      } finally {
        setIsTranslating(false);
      }
    };

    translateCurrentQuestion();
  }, [question, i18n.language]); // Re-run effect if question or language changes

  return { translatedQuestion, isTranslating, translationError };
};
