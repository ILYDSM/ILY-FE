import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RootNavigation from "./src/navigations/RootNavigation";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar"
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { setCustomText } from "react-native-global-props";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isFontLoaded] = useFonts({
    "Ptd EL": require("@/../assets/fonts/Pretendard-ExtraLight.otf"),
    "Ptd L": require("@/../assets/fonts/Pretendard-Light.otf"),
    "Ptd M": require("@/../assets/fonts/Pretendard-Medium.otf"),
    "Ptd": require("@/../assets/fonts/Pretendard-Regular.otf"),
    "Ptd SB": require("@/../assets/fonts/Pretendard-SemiBold.otf"),
    "Ptd B": require("@/../assets/fonts/Pretendard-Bold.otf"),
    "Ptd EB": require("@/../assets/fonts/Pretendard-ExtraBold.otf"),
    "Ptd BL": require("@/../assets/fonts/Pretendard-Black.otf"),
  })

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#FFFFFF");
    NavigationBar.setButtonStyleAsync("dark");
    SplashScreen.hideAsync();
  }, []);
  
  if (!isFontLoaded) {
    return null;
  }
  
  setCustomText({
    style:{
      fontFamily: "Ptd"
    }
  })
  
  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: "#ffffff",
          },
        }}
      >
        <RootNavigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}