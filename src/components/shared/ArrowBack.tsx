import { COLORS } from '@/src/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions } from 'react-native';

const ArrowBack = () => {
  const handlePress = () => router.push('/(tabs)');
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <TouchableOpacity
      style={[styles.container, isTablet && styles.containerTablet]}
      onPress={handlePress}
      accessibilityLabel="Back"
    >
      <Ionicons name="arrow-back" size={isTablet ? 24 : 16} color={COLORS.text_black} />
      <Text style={[styles.text, isTablet && styles.textTablet]}>{t('common.btnBack')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  containerTablet: {
    marginBottom: 24,
    gap: 8,
  },
  text: {
    fontSize: 16,
    color: COLORS.text_black,
  },
  textTablet: {
    fontSize: 22,
  }
});

export default ArrowBack;
