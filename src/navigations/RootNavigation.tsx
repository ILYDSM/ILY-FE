import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from '@/navigations/Auth';
import Main from '@/navigations/Main';
import Goal from '@/navigations/Goal';
import Group from '@/navigations/Group';
import Menu from '@/navigations/Menu';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      initialRouteName="Auth"
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="Goal" component={Goal} />
      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
  );
};
