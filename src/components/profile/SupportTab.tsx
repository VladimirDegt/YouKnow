import { COLORS } from '@/src/constants/colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

const SupportTab = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.content}>{t('profile.support.info')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  content: {
    fontSize: 16,
    color: COLORS.text_black,
    lineHeight: 24,
  },
});

export default SupportTab; 