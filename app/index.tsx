import {Redirect} from 'expo-router';

export default function Index() {
  if (__DEV__) {
    require("../ReactotronConfig");
  }
  
  return <Redirect href="/(tabs)" />;
}

