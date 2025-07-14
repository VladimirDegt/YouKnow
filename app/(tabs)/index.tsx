import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, useWindowDimensions, View } from 'react-native';

import { COLORS } from '@/src/constants/colors';
import { contentService } from '@/src/services/api';
import { useContentStore } from '@/src/store/contentStore';
import onboardingUtils from '../utils/onboarding';

import CategoriesTab from '@/src/components/home/CategoriesTab';
import NewsTab from '@/src/components/home/NewsTab';
import TabSelector from '@/src/components/profile/TabSelector';

const fanFactImg = require('@/src/assets/images/fanFact.png');
const scienceFactImg = require('@/src/assets/images/scienceFact.png');
const dayQuoteImg = require('@/src/assets/images/day_quote.png');
const dayEventImg = require('@/src/assets/images/day_event.png');
const dayQuestionImg = require('@/src/assets/images/day_question.png');
const interestingPeopleImg = require('@/src/assets/images/interesting_people.png');

const categories = [
  { id: 1, name: "funFact", route: 'fanFact', img: fanFactImg },
  { id: 2, name: "scienceFact", route: 'scienceFact', img: scienceFactImg },
  { id: 3, name: "quoteOfDay", route: 'dayQuote', img: dayQuoteImg },
  { id: 4, name: "thisDayHistory", route: 'dayEvent', img: dayEventImg },
  { id: 5, name: "questionOfDay", route: 'dayQuestion', img: dayQuestionImg },
  { id: 6, name: "interestingPeople", route: 'interestingPeople', img: interestingPeopleImg },
];

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingButtonId, setLoadingButtonId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('categories');
  const setContent = useContentStore((state) => state.setContent);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const numColumns = isTablet ? 3 : 2;
  const gap = isTablet ? 24 : 16;
  const horizontalPadding = isTablet ? 32 * 2 : 16 * 2;
  const itemWidth = isTablet
    ? (width - horizontalPadding - gap * (numColumns - 1)) / numColumns
    : '48%';
  const { t, i18n } = useTranslation();
  
  const handleButtonPress = async( id: number, route: string) => {
    setLoading(true);
    setLoadingButtonId(id);
    
    try {
      const data = await contentService.getContent(route, i18n.language);
      setContent(data.message);
      router.push('/content');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('common.errorMessage');
      Alert.alert(
        t('common.errorTitle'),
        errorMessage,
        [{ text: t('common.ok'), style: 'default' }]
      );
      setContent(errorMessage);
    } finally {
      setLoading(false);
      setLoadingButtonId(null);
    }
  }

  const handleResetOnboarding = async () => {
    try {
      await onboardingUtils.resetOnboarding();
      Alert.alert(
        t('common.success'),
        'Онбординг успешно сброшен',
        [{ text: t('common.ok'), style: 'default' }]
      );
    } catch (error) {
      Alert.alert(
        t('common.errorTitle'),
        'Ошибка при сбросе онбординга',
        [{ text: t('common.ok'), style: 'default' }]
      );
    }
  };

  const renderContent = () => {
    if (activeTab === 'categories') {
      return (
        <CategoriesTab
          categories={categories}
          isTablet={isTablet}
          numColumns={numColumns}
          gap={gap}
          itemWidth={typeof itemWidth === 'number' ? itemWidth : 0}
        />
      );
    }
    return <NewsTab />;
  };

  return (
    <View style={styles.container}>
      <TabSelector
        activeTab={activeTab}
        onTabPress={setActiveTab}
        tabs={[
          { key: 'categories', label: t('home.tabs.categories') },
          { key: 'news', label: t('home.tabs.news') },
        ]}
      />
      {renderContent()}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  blockBtn: {
    flexGrow: 1,
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  blockBtnTablet: {
    marginVertical: 40,
    paddingHorizontal: 32,
  },
  row: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    paddingVertical: 8,
  },
  gridItemTablet: {
    paddingVertical: 12,
  },
  btn: {
    aspectRatio: 1,
    backgroundColor: COLORS.btn_background,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 12,
    overflow: 'hidden',
  },
  btnTablet: {
    borderRadius: 16,
    padding: 20,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  logoTablet: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'left',
    color: COLORS.text_black,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  headerTextTablet: {
    fontSize: 32,
    marginBottom: 24,
  },
  textBtn: {
    fontSize: 16,
    color: COLORS.text_white,
    fontWeight: '600',
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  textBtnTablet: {
    fontSize: 22,
    lineHeight: 28,
  },
  resetButton: {
    backgroundColor: COLORS.btn_background,
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
    alignSelf: 'center',
  },
  resetButtonText: {
    color: COLORS.text_white,
    fontSize: 16,
    fontWeight: '600',
  },
});
