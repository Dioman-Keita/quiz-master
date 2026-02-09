// src/shared/lib/translation-service.ts

interface TranslationCache {
  [key: string]: {
    [targetLang: string]: string;
  };
}

const TRANSLATION_CACHE_KEY = 'quiz_master_translations';

function getTranslationCache(): TranslationCache {
  try {
    const cached = localStorage.getItem(TRANSLATION_CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch (error) {
    console.error("Failed to read translation cache from localStorage:", error);
    return {};
  }
}

function updateTranslationCache(text: string, targetLang: string, translatedText: string): void {
  try {
    const cache = getTranslationCache();
    if (!cache[text]) {
      cache[text] = {};
    }
    cache[text][targetLang] = translatedText;
    localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error("Failed to write translation cache to localStorage:", error);
  }
}

/**
 * Translates text using an unofficial Google Translate API endpoint.
 * This approach is not officially supported by Google and may be subject to rate limits,
 * breaking changes, or terms of service violations.
 *
 * For production applications, it is highly recommended to use the official Google Cloud Translation API
 * via a secure backend or serverless function to prevent API key exposure and ensure reliability.
 *
 * @param text The text to translate.
 * @param targetLang The target language code (e.g., 'fr' for French, 'en' for English).
 * @returns A Promise that resolves with the translated text, or the original text if translation fails.
 */
export async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text || targetLang === 'en') {
    return text; // No need to translate if text is empty or target is English
  }

  const cache = getTranslationCache();
  if (cache[text] && cache[text][targetLang]) {
    console.log(`Cache hit for "${text}" to ${targetLang}`);
    return cache[text][targetLang];
  }

  console.log(`Translating "${text}" to ${targetLang} (cache miss)`);

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Translation API responded with status: ${response.status}`);
      return text; // Fallback to original text on HTTP error
    }
    const data = await response.json();
    // Google Translate API response format can be complex.
    // The translated text is usually in data[0][0][0] for simple single-string translations.
    const translatedText = data[0][0][0];

    if (translatedText) {
      updateTranslationCache(text, targetLang, translatedText);
      return translatedText;
    }
    return text; // Fallback if translation result is empty
  } catch (error) {
    console.error("Error during translation:", error);
    return text; // Fallback to original text on network or parsing error
  }
}
