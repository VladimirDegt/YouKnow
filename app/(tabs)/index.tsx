import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { COLORS } from '@/src/constants/colors';
import { contentService } from '@/src/services/api';
import { useContentStore } from '@/src/store/contentStore';

import Loader from '@/src/components/shared/Loader';

const fanFactImg = require('@/src/assets/images/fanFact.png');
const scienceFactImg = require('@/src/assets/images/scienceFact.png');
const dayQuoteImg = require('@/src/assets/images/day_quote.png');
const dayEventImg = require('@/src/assets/images/day_event.png');
const dayQuestionImg = require('@/src/assets/images/day_question.png');

const categories = [
  { id: 1, name: "funFact", route: 'fanFact', img: fanFactImg },
  { id: 2, name: "scienceFact", route: 'scienceFact', img: scienceFactImg },
  { id: 3, name: "quoteOfDay", route: 'dayQuote', img: dayQuoteImg },
  { id: 4, name: "thisDayHistory", route: 'dayEvent', img: dayEventImg },
  { id: 5, name: "questionOfDay", route: 'dayQuestion', img: dayQuestionImg },
];

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingButtonId, setLoadingButtonId] = useState<number | null>(null);
  const setContent = useContentStore((state) => state.setContent);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const numColumns = isTablet ? 3 : 2;
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
  
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.blockBtn}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={<Text style={styles.headerText}>{t('home.chooseCategory')}</Text>}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleButtonPress(item.id, item.route)}
              disabled={loading}
            >
              <View style={styles.buttonContent}>
                {loadingButtonId === item.id && <Loader />}
                <Image
                  source={item.img}
                  style={styles.logo}
                  resizeMode="cover"
                />
                <Text style={styles.textBtn} numberOfLines={2}>{t(`home.categories.${item.name}`)}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
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
  row: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    paddingVertical: 8,
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
  buttonContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'left',
    color: COLORS.text_black,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  textBtn: {
    fontSize: 16,
    color: COLORS.text_white,
    fontWeight: '600',
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
});
