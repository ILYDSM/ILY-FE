import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MandalArtTheme from '@/screens/MandalArtTheme';
import GoalCalendar from '@/screens/GoalCalendar';

const Stack = createNativeStackNavigator();

const Menu = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="MandalArtTheme" component={MandalArtTheme} />
      <Stack.Screen name="GoalCalendar" component={GoalCalendar} />
    </Stack.Navigator>
  );
};

export default Menu;
