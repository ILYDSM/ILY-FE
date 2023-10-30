import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from '@/navigations/Auth';
import Main from '@/navigations/Main';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
  );
};
