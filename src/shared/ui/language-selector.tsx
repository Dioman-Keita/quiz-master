import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './button'; // Assuming a Button component exists

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <Button
        onClick={() => changeLanguage('en')}
        variant={i18n.language === 'en' ? 'default' : 'outline'}
        size="sm"
      >
        EN
      </Button>
      <Button
        onClick={() => changeLanguage('fr')}
        variant={i18n.language === 'fr' ? 'default' : 'outline'}
        size="sm"
      >
        FR
      </Button>
    </div>
  );
};