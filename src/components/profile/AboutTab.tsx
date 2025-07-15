import { COLORS } from '@/src/constants/colors';
import * as StoreReview from 'expo-store-review';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

const AboutTab = () => {
  const { t } = useTranslation();

  const handleRequestReview = async () => {
    const isAvailable = await StoreReview.isAvailableAsync();
    if (isAvailable) {
      StoreReview.requestReview();
      return;
    }
    Alert.alert(
      t('profile.about.reviewUnavailableTitle'),
      t('profile.about.reviewUnavailableMsg')
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>{t('profile.about.aiInfo')}</Text>
      <Text style={styles.version}>{t('profile.about.version', { version: '1.1.0' })}</Text>
      <Pressable
        onPress={handleRequestReview}
        accessibilityRole="button"
        accessibilityLabel={t('profile.about.rateApp')}
        style={({ pressed }) => [
          { opacity: pressed ? 0.7 : 1 },
          { backgroundColor: COLORS.btn_background, padding: 12, borderRadius: 8, marginTop: 24, alignItems: 'center' }
        ]}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{t('profile.about.rateApp')}</Text>
      </Pressable>
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
