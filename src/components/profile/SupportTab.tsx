import { COLORS } from '@/src/constants/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SupportTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Информация о поддержке</Text>
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