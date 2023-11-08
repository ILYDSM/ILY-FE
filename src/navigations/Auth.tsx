import ChangePwd from '@/screens/ChangePwd';
import ConfirmSignUp from '@/screens/ConfirmSignUp';
import KakaoLogin from '@/screens/KakaoLogin';
import Login from '@/screens/Login';
import NaverLogin from '@/screens/NaverLogin';
import Rending from '@/screens/Rending';
import SelectInterest from '@/screens/SelectInterest';
import SignUp from '@/screens/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      initialRouteName="Rending"
    >
      <Stack.Screen name="Rending" component={Rending} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ChangePwd" component={ChangePwd} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SelectInterest" component={SelectInterest} />
      <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
      <Stack.Screen name="NaverLogin" component={NaverLogin} />
    </Stack.Navigator>
  );
};

export default Auth;
