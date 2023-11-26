import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MandalArtTheme from '@/screens/MandalArtTheme';
import GoalCalendar from '@/screens/GoalCalendar';
import MenuChangePwd from '@/screens/MenuChangePwd';
import DeleteAccount from '@/screens/DeleteAccount ';
import InterestChange from '@/screens/InterestChange';

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
      <Stack.Screen name="MenuChangePwd" component={MenuChangePwd} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen name="InterestChange" component={InterestChange} />
    </Stack.Navigator> 
  );
};
export default Menu;
