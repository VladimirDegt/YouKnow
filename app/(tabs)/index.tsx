import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '@/src/constants/colors';
import { contentService } from '@/src/services/api';
import { useContentStore } from '@/src/store/contentStore';

import Loader from '@/src/components/shared/Loader';

const categories = [
  { id: 1, name: "Fun Fact", route: 'fanFact'},
  { id: 2, name: "Science Fact", route: 'scienceFact' },
  { id: 3, name: "Quote of the Day", route: 'dayQuote' },
  { id: 4, name: "This Day in History", route: 'dayEvent' },
  { id: 5, name: "Question of the Day", route: 'dayQuestion' },
];

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingButtonId, setLoadingButtonId] = useState<number | null>(null);
  const setContent = useContentStore((state) => state.setContent);
  
  const handleButtonPress = async( id: number, route: string) => {
    setLoading(true);
    setLoadingButtonId(id);
    
    try {
      const data = await contentService.getContent(route);
      setContent(data.message);
      router.push('/content');
    } catch (error) {
      console.error('Error:', error);
      setContent('Something went wrong');
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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleButtonPress(item.promt, item.id, item.route)}
            disabled={loading}
          >
            <View style={styles.buttonContent}>
              {loadingButtonId === item.id && <Loader />}
              <Text style={styles.textBtn}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  blockBtn: {
    flexGrow: 1,
    alignItems: "stretch",
    marginTop: 64,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  btn: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textBtn: {
    fontSize: 18,
    color: COLORS.text,
  },
});
