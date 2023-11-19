import { SafeAreaView, StyleSheet, View, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParam } from "@/utils/RootStackParam";
import { getItem, setItem } from "@/utils/AsyncStorage";
import TitleBar from "@/components/common/TitleBar";
import MandalArt from "@/components/common/MandalArt/MandalArt";
import CustomInput from "@/components/common/CustomInput";
import CustomButton from "@/components/common/CustomButton";

const GoalCreateMain = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [mandalData, setMandalData] = useState<string[]>([]);
  
  const titleChange = (title: string) => {
    const data = [title, ...mandalData.slice(1)];
    setMandalData(data);
    setItem('mandalArtCreate', JSON.stringify(data));
  }

  const getData = async() => {
    const data = await getItem('mandalArtCreate');
    setMandalData(JSON.parse(data ?? "[]"));
    return;
  }
  
  useEffect(() => {
    const dataFn = navigation.addListener('focus', () => {
      getData();
    });
    return dataFn;
  }, [navigation])

  useEffect(() => {
    setItem('mandalArtCreate', JSON.stringify(new Array(73).fill('')));
    
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={[styles.container, { paddingBottom: keyboardStatus ? 0 : 16 }]}>
      <ScrollView>
        <TitleBar title='핵심 목표' onPress={() => navigation.goBack()}/>
        <View style={styles.contentBox}>
          <MandalArt data={mandalData.slice(1, 9)} title={mandalData[0]} />
          <CustomInput
            text="핵심 목표"
            onChangeText={titleChange}
            value={mandalData[0]}
          />
        </View>
      </ScrollView>
      <CustomButton title='→ 다음' disabled={mandalData[0]?.trim() === ''} onPress={() => navigation.navigate('Goal', { screen: 'GoalCreateSub' })}/>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default GoalCreateMain;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    flex: 1
  },
  contentBox: {
    gap: 20,
    flex: 10
  }
})