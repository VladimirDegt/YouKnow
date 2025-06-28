import ArrowBack from '@/src/components/shared/ArrowBack';
import { COLORS } from '@/src/constants/colors';
import { useContentStore } from '@/src/store/contentStore';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

const ContentScreen = () => {
  const content = useContentStore((state) => state.content);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <View style={styles.container}>
      <View style={[styles.header, isTablet && styles.headerTablet]}>
        <ArrowBack />
      </View>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[styles.contentContainer, isTablet && styles.contentContainerTablet]}
        showsVerticalScrollIndicator={true}
      >
        <Text style={[styles.content, isTablet && styles.contentTablet]}>{content}</Text>
      </ScrollView>
    </View>
  )
}

export default ContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTablet: {
    paddingHorizontal: 32,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  contentContainerTablet: {
    paddingVertical: 32,
    paddingHorizontal: 32,
  },
  content: {
    fontSize: 16,
    color: COLORS.text_black,
    lineHeight: 24,
  },
  contentTablet: {
    fontSize: 22,
    lineHeight: 32,
  }
})
