import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@/src/screens/HomeScreen';
import ContentScreen from '@/src/screens/ContentScreen';
import {Ionicons} from '@expo/vector-icons';

const Tabs = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
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
      <Tabs.Screen name='home' component={HomeScreen} options={{
        tabBarIcon: ({color}) => <Ionicons name='home' size={24} color={color}/>
        
      }}/>
      <Tabs.Screen name='content' component={ContentScreen} options={{
        tabBarIcon: ({color}) => <Ionicons name='book' size={24} color={color}/>
        
      }}/>
    </Tabs.Navigator>
  )
}

export default BottomTabNavigator;

