import { COLORS } from '@/src/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ArrowBack = () => {
  const handlePress = () => router.push('/(tabs)');
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      accessibilityLabel="Back"
    >
      <Ionicons name="arrow-back" size={16} color={COLORS.text_black} />
      <Text style={styles.text}>{t('common.btnBack')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 4,
  },
  text: {
    fontSize: 16,
    color: COLORS.text_black,
  }
});

export default ArrowBack;
