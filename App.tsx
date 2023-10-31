import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigations/RootNavigation';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}