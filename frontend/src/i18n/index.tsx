import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ja from './locales/ja/common.json';
import en from './locales/en/common.json';
import question_ja from '@/assets/pages/question/locales/ja.json'
import question_en from '@/assets/pages/question/locales/en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ja: {
        common: ja,
        question: question_ja
      },
      en: {
        common: en,
        question: question_en
      },
    },
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false
    },
  });

export default i18n;