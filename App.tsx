import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootNavigation from './src/navigations/RootNavigation';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { setCustomText } from 'react-native-global-props';
import { Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isFontLoaded] = useFonts({
    '100': require('@/../assets/fonts/Pretendard-Thin.otf'),
    '200': require('@/../assets/fonts/Pretendard-ExtraLight.otf'),
    '300': require('@/../assets/fonts/Pretendard-Light.otf'),
    '400': require('@/../assets/fonts/Pretendard-Regular.otf'),
    '500': require('@/../assets/fonts/Pretendard-Medium.otf'),
    '600': require('@/../assets/fonts/Pretendard-SemiBold.otf'),
    '700': require('@/../assets/fonts/Pretendard-Bold.otf'),
    '800': require('@/../assets/fonts/Pretendard-ExtraBold.otf'),
    '900': require('@/../assets/fonts/Pretendard-Black.otf'),
  });

  useEffect(() => {
    Platform.OS === 'android' && NavigationBar.setBackgroundColorAsync('#FFFFFF');
    Platform.OS === 'android' && NavigationBar.setButtonStyleAsync('dark');
    SplashScreen.hideAsync();
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  setCustomText({
    style: {
      fontFamily: '500',
    },
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: '#ffffff',
          },
        }}
      >
        <RootNavigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
