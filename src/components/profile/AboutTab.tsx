import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '@/src/constants/colors';

const AboutTab = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.info}>{t('profile.about.aiInfo')}</Text>
      <Text style={styles.version}>{t('profile.about.version', { version: '1.0.0' })}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 16,
    color: COLORS.text_black,
  },
  version: {
    fontSize: 14,
    color: COLORS.text_gray,
  },
});

export default AboutTab;
