import { COLORS } from '@/src/constants/colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const NewsTab = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  return (
    <View style={styles.container}>
      <Text style={[styles.text, isTablet && styles.textTablet]}>{t('home.tabs.newsStub')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: COLORS.text_black,
    textAlign: 'center',
  },
  textTablet: {
    fontSize: 24,
  },
});

export default NewsTab; 