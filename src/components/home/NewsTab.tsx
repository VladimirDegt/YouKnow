import Loader from '@/src/components/shared/Loader';
import { COLORS } from '@/src/constants/colors';
import { getNews, NewsItem, NewsResponse } from '@/src/services/api';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const NewsTab = () => {
  const { t, i18n } = useTranslation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [news, setNews] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getNews(i18n.language)
      .then(setNews)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [i18n.language]);

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity
      style={[styles.newsItem, isTablet && styles.newsItemTablet]}
      onPress={() => handleOpenLink(item.link)}
      accessible accessibilityLabel={item.title}
    >
      {item.img && !imageError ? (
        <Image
          source={{ uri: item.img }}
          style={[styles.newsImage, isTablet && styles.newsImageTablet]}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <View
          style={[
            styles.newsImage,
            isTablet && styles.newsImageTablet,
            styles.noImageContainer,
          ]}
          accessible
          accessibilityLabel={t('news.noImage')}
          importantForAccessibility="yes"
        >
          <MaterialIcons
            name="image-not-supported"
            size={isTablet ? 48 : 32}
            color={COLORS.text_gray}
            accessibilityLabel={t('news.noImage')}
            style={{ marginBottom: 4 }}
          />
          <Text style={styles.noImageText}>{t('news.noImage')}</Text>
        </View>
      )}
      <View style={styles.newsContent}>
        <Text style={[styles.newsTitle, isTablet && styles.newsTitleTablet]}>{item.title}</Text>
        <Text style={[styles.newsFullContent, isTablet && styles.newsFullContentTablet]}>{item.content}</Text>
        <Text style={[styles.newsDate, isTablet && styles.newsDateTablet]}>{formatDate(item.pubDate)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!news) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.sourceContainer}>
        <TouchableOpacity onPress={() => handleOpenLink(news.source.link)} accessible accessibilityLabel={news.source.title}>
          <Image source={{ uri: news.source.image }} style={[styles.sourceImage, isTablet && styles.sourceImageTablet]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenLink(news.source.link)} accessible accessibilityLabel={news.source.title}>
          <Text
            style={[styles.sourceTitle, isTablet && styles.sourceTitleTablet, styles.sourceTitleEllipsis]}
          >
            {news.source.title}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={news.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.link}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  errorText: {
    color: COLORS.text_black,
    fontSize: 18,
    textAlign: 'center',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sourceImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  sourceImageTablet: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  sourceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text_black,
    maxWidth: 200,
    flexShrink: 1,
  },
  sourceTitleTablet: {
    fontSize: 28,
    maxWidth: 320,
  },
  sourceTitleEllipsis: {
    flexShrink: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  newsItem: {
    flexDirection: 'column',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  newsItemTablet: {
    borderRadius: 20,
    marginBottom: 24,
  },
  newsImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: COLORS.background,
  },
  newsImageTablet: {
    height: 260,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.border,
  },
  noImageText: {
    color: COLORS.text_gray,
    fontSize: 16,
  },
  newsContent: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text_black,
    marginBottom: 4,
  },
  newsTitleTablet: {
    fontSize: 22,
  },
  newsFullContent: {
    fontSize: 15,
    color: COLORS.text_black,
    marginBottom: 8,
  },
  newsFullContentTablet: {
    fontSize: 19,
  },
  newsDescription: {
    fontSize: 14,
    color: COLORS.text_gray,
    marginBottom: 8,
  },
  newsDescriptionTablet: {
    fontSize: 18,
  },
  newsDate: {
    fontSize: 12,
    color: COLORS.text_gray,
    textAlign: 'right',
  },
  newsDateTablet: {
    fontSize: 16,
  },
});

export default NewsTab;
