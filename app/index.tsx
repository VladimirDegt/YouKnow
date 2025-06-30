import { Redirect } from 'expo-router';
import "../ReactotronConfig";

export default function Index() {
  return <Redirect href="/(tabs)" />;
}

