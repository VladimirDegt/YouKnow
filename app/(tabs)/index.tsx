import {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Loader from '@/src/components/shared/Loader';

import {fanFactPromt, scienceFactPromt} from '@/src/db/promts';
import {api} from '@/src/api/axiosClient';

const categories = [
  { id: 1, name: "Fun Fact", promt: fanFactPromt},
  { id: 2, name: "Science Fact", promt: scienceFactPromt },
  { id: 3, name: "Quote of the Day", promt: '' },
  { id: 4, name: "This Day in History", promt: '' },
  { id: 5, name: "Question of the Day", promt: '' },
  { id: 6, name: "Health", promt: '' },
  { id: 7, name: "Motivation", promt: '' },
];

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingButtonId, setLoadingButtonId] = useState<number | null>(null);
  
  const handleButtonPress = async(prompt: string, id: number) => {
    setLoading(true);
    setLoadingButtonId(id);
    try {
      const response = await api.sendPrompt(prompt);
      // @ts-expect-error TODO create type response
      console.log('response', response?.output[0]?.content[0]?.text)
    } catch (error) {
      console.error('Error fetching data:', error);
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
            onPress={() => handleButtonPress(item.promt, item.id)}
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
    backgroundColor: "#2b7afb",
  },
  blockBtn: {
    flexGrow: 1,
    alignItems: "stretch",
    marginTop: 64,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#F4F7FA",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  btn: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#2b7afb"
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textBtn: {
    fontSize: 18,
    color: "#272727",
  },
});
