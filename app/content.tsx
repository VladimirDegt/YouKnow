import ArrowBack from '@/src/components/shared/ArrowBack';
import {COLORS} from '@/src/constants/colors';
import {useContentStore} from '@/src/store/contentStore';
import {StyleSheet, Text, View} from 'react-native';

const ContentScreen = () => {
  const content = useContentStore((state) => state.content);

  return (
    <View style={styles.container}>
      <ArrowBack />
      <Text style={styles.content}>{content}</Text>
    </View>
  )
}

export default ContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  content: {
    fontSize: 16,
    color: COLORS.text_black,
    lineHeight: 24,
  }
})
