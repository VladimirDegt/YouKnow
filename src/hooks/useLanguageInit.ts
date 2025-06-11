import i18next from '@/services/i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const LANGUAGE_STORAGE_KEY = '@app_language';

export const useLanguageInit = () => {
  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage) {
          i18next.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };

    loadSavedLanguage();
  }, []);
}; 