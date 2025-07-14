import Loader from '@/src/components/shared/Loader';
import { COLORS } from '@/src/constants/colors';
import { contentService } from '@/src/services/api';
import { useContentStore } from '@/src/store/contentStore';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {router} from 'expo-router';

export type Category = {
  id: number;
  name: string;
  route: string;
  img: any;
};

interface CategoriesTabProps {
  categories: Category[];
  isTablet: boolean;
  numColumns: number;
  gap: number;
  itemWidth: number;
}

const CategoriesTab: React.FC<CategoriesTabProps> = ({ categories, isTablet, numColumns, gap, itemWidth }) => {
  const [loading, setLoading] = useState(false);
  const [loadingButtonId, setLoadingButtonId] = useState<number | null>(null);
  const setContent = useContentStore((state) => state.setContent);
  const { t, i18n } = useTranslation();

  const handleButtonPress = async (id: number, route: string) => {
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
  };

  return (
    <FlatList
      contentContainerStyle={[styles.blockBtn, isTablet && styles.blockBtnTablet]}
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      columnWrapperStyle={isTablet ? { gap } : styles.row}
      renderItem={({ item }) => (
        <View
          style={[
            styles.gridItem,
            isTablet && { width: itemWidth },
            isTablet && styles.gridItemTablet,
          ]}
        >
          <TouchableOpacity
            style={[styles.btn, isTablet && styles.btnTablet]}
            onPress={() => handleButtonPress(item.id, item.route)}
            disabled={loading}
          >
            <View style={styles.buttonContent}>
              {loadingButtonId === item.id && <Loader />}
              <Image
                source={item.img}
                style={[styles.logo, isTablet && styles.logoTablet]}
                resizeMode="cover"
              />
              <Text style={[styles.textBtn, isTablet && styles.textBtnTablet]} numberOfLines={2}>{t(`home.categories.${item.name}`)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
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
});

export default CategoriesTab; 