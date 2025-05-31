import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function BottomTabBar() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
          height: 60,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarActiveTintColor: '#2b7afb',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tabs.Screen 
        name='index' 
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => <Ionicons name='home' size={24} color={color}/>
        }}
      />
      <Tabs.Screen 
        name='content' 
        options={{
          title: 'Content',
          tabBarIcon: ({color}) => <Ionicons name='book' size={24} color={color}/>
        }}
      />
    </Tabs>
  );
}
