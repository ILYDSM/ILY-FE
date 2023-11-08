import ChangePwd from '@/screens/ChangePwd';
import ConfirmChangePwd from '@/screens/ConfirmChangePwd';
import KakaoLogin from '@/screens/KakaoLogin';
import Login from '@/screens/Login';
import NaverLogin from '@/screens/NaverLogin';
import NewPassword from '@/screens/NewPassword';
import Rending from '@/screens/Rending';
import SignUp from '@/screens/SignUp';
import VerifyEmail from '@/screens/VerifyEmail';
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
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="ConfirmChangePwd" component={ConfirmChangePwd} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
      <Stack.Screen name="NaverLogin" component={NaverLogin} />
    </Stack.Navigator>
  );
};

export default Auth;
