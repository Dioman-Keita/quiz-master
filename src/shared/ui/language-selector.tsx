import React from 'react';
import { useTranslation } from 'react-i18next';
// No longer need Button component for language selection

export const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="relative inline-block text-white">
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        className="block appearance-none w-full bg-gray-700 border border-gray-600 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
        aria-label={t("common.language")}
      >
        <option value="en">{t("common.english")}</option>
        <option value="fr">{t("common.french")}</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};