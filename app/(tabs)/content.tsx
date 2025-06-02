import {StyleSheet, Text, View} from 'react-native';

const ContentScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Content</Text>
    </View>
  )
}

export default ContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b7afb",
    paddingTop: 100
  },
})
