import { SafeAreaView, StyleSheet, View, Text, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParam } from "@/utils/RootStackParam";
import { getItem, setItem } from "@/utils/AsyncStorage";
import TitleBar from "@/components/common/TitleBar";
import MandalArtEdit from "@/components/common/MandalArt/MandalArtEdit";
import CustomButton from "@/components/common/CustomButton";

const GoalCreateSub = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [mandalData, setMandalData] = useState<string[]>([])

  const SubTitleChange = (subTitle: string[]) => {
    setMandalData(mandalData => [mandalData[0], ...subTitle, ...mandalData.slice(9)]);
  }

  const onGoBack = () => {
    setItem('mandalArtCreate', JSON.stringify(mandalData));
    navigation.goBack();
  }

  const onSubmit = () => {
    setItem('mandalArtCreate', JSON.stringify(mandalData));
    navigation.navigate('Goal', { screen: 'GoalCreateDetail' })
  }

  const GetData = async () => {
    const stringData = await getItem('mandalArtCreate');
    const arrayData = JSON.parse(stringData ?? "[]");
    setMandalData(arrayData.length <= 1 ? [arrayData[0], ...new Array(8).fill('')] : arrayData);
    return;
  }

  useEffect(() => {
    const dataFn = navigation.addListener('focus', () => {
      GetData()
    });
    return dataFn;
  }, [navigation])

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true)
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false)
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    }
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { paddingBottom: keyboardStatus ? 0 : 16 }]}>
        <ScrollView>
          <TitleBar title='보조 목표' onPress={onGoBack} />
          <View style={styles.contentBox}>
            <MandalArtEdit
              title={mandalData[0]}
              data={mandalData.slice(1, 9)}
              onChangeData={SubTitleChange}
            />
            <Text style={styles.text}>보조 목표 칸을 클릭해 입력하세요</Text>
          </View>
        </ScrollView>
        <CustomButton title='→ 다음' onPress={onSubmit} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default GoalCreateSub;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    flex: 1
  },
  contentBox: {
    gap: 20,
    flex: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  }
})