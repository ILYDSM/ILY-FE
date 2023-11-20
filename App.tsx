import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootNavigation from './src/navigations/RootNavigation';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar'
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isFontLoaded] = useFonts({
    "Pretendard Variable": require('@/../assets/fonts/PretendardVariable.ttf'),
  })

  useEffect(() => {
    SplashScreen.hideAsync();
    if(Platform.OS === 'android'){
      NavigationBar.setBackgroundColorAsync('#FFFFFF');
    }
  }, [isFontLoaded]);

  if (!isFontLoaded) {
    return null;
  }

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