import i18next from '@/services/i18next';
import {COLORS} from '@/src/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';

import FlagEN from '@/src/assets/icons/flagEN.svg';
import FlagRU from '@/src/assets/icons/flagRU.svg';
import FlagSP from '@/src/assets/icons/flagSP.svg';
import FlagUA from '@/src/assets/icons/flagUA.svg';

const LANGUAGES = [
  {code: 'en', flag: FlagEN, name: 'English'},
  {code: 'ua', flag: FlagUA, name: 'Українська'},
  {code: 'sp', flag: FlagSP, name: 'Español'},
  {code: 'ru', flag: FlagRU, name: 'Русский'},
];

const LANGUAGE_STORAGE_KEY = '@app_language';

const LanguageSelector = () => {
  const {i18n, t} = useTranslation();
  const {width} = useWindowDimensions();
  const isTablet = width >= 768;
  
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
  
  const handleChangeLang = async (langCode: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, langCode);
      i18next.changeLanguage(langCode);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };
  
  return (
    <View style={[styles.flagsContainer, isTablet && styles.flagsContainerTablet]}>
      {LANGUAGES.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.flagButton,
            isTablet && styles.flagButtonTablet,
            i18n.language === lang.code && styles.activeFlagButton,
          ]}
          onPress={() => handleChangeLang(lang.code)}
          accessibilityLabel={t('profile.language.select')}
          accessibilityRole="button"
        >
          <lang.flag
            width={isTablet ? 96 : 64}
            height={isTablet ? 96 : 64}
          />
          <Text style={[styles.flagText, isTablet && styles.flagTextTablet]}>{t(`profile.language.names.${lang.code}`)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  flagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 32
  },
  flagsContainerTablet: {
    marginTop: 48,
  },
  flagButton: {
    width: '48%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: COLORS.btn_background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flagButtonTablet: {
    padding: 20,
    marginBottom: 24,
    borderRadius: 12,
    shadowRadius: 6,
    elevation: 5,
  },
  activeFlagButton: {
    borderWidth: 3,
    borderColor: COLORS.active,
  },
  flagText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.text_white,
    textAlign: 'center',
  },
  flagTextTablet: {
    marginTop: 12,
    fontSize: 20,
  },
});

export default LanguageSelector;
