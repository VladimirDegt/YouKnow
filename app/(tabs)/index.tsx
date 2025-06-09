import {router} from 'expo-router';
import {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';

import {COLORS} from '@/src/constants/colors';
import {contentService} from '@/src/services/api';
import {useContentStore} from '@/src/store/contentStore';

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
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const numColumns = isTablet ? 3 : 2;
  
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
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={<Text style={styles.headerText}>Choose a category</Text>}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleButtonPress(item.id, item.route)}
              disabled={loading}
            >
              <View style={styles.buttonContent}>
                {loadingButtonId === item.id && <Loader />}
                <Text style={styles.textBtn}>{item.name}</Text>
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
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'left',
    color: COLORS.text_black,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  textBtn: {
    fontSize: 20,
    color: COLORS.text_white,
    fontWeight: '600',
    textAlign: 'center',
  },
});
