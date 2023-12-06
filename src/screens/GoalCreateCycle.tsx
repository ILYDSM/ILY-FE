import { SafeAreaView, StyleSheet, View, Text, FlatList, Keyboard, TouchableWithoutFeedback } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParam } from "@/utils/RootStackParam";
import TitleBar from "@/components/common/TitleBar";
import { platte } from "@/styles/platte";
import CustomButton from "@/components/common/CustomButton";
import { useEffect, useState } from "react";
import ThemeSelector from "@/utils/ThemeSelector";
import { createMandalArt, editMandalArt } from "@/apis/target";
import { getItem } from "@/utils/AsyncStorage";
import CustomInput from "@/components/common/CustomInput";

const GoalCreateCycle = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [themeColor, setThemeColor] = useState<string>('Gray')
  const [mandalData, setMandalData] = useState<string[]>([]);
  const [mandalCycle, setMandalCycle] = useState<number>(0)

  const getData = async () => {
    const stringData = await getItem('mandalArtCreate');
    const themeData = await getItem('mandalTheme');
    const cycleData = await getItem('mandalCycle');

    if (stringData) {
      setMandalData(JSON.parse(stringData));
    }
    if (themeData) {
      setThemeColor(themeData)
    }
    if (cycleData) {
      setMandalCycle(Number(JSON.parse(cycleData)));
    }

    return;
  }

  useEffect(() => {
    const dataFn = navigation.addListener('focus', () => {
      getData();
    });
    return dataFn;
  }, [navigation])

  const onCreate = async () => {
    const type = await getItem('mandalType');
    const id = await getItem('mandalId');
    const infoJSON = await getItem('MandalInfo');

    const today = () => {
      const date = new Date();
      const twoWord = (num: number) => `0${num}`.slice(-2);
      return `${date.getFullYear()}-${twoWord(date.getMonth() + 1)}-${twoWord(date.getDate())}`;
    }

    if(type === 'edit' && id && infoJSON) {
      const info = JSON.parse(infoJSON);
      await editMandalArt(id, {
        target: mandalData[0],
        cycle_count: Number(info[0]) + 1,
        cycle_term: mandalCycle,
        cycle_date: info[1]  || today(),
        sub_targets: mandalData.slice(1, 9).map((value) => value.trim()),
        detail_targets: mandalData.slice(9, 73).map((value) => value.trim()),
        theme: themeColor,
        theme_price: (ThemeSelector(themeColor) as MandalaArtThemeType).description.point
      }).then(() => {
        navigation.reset({ routes: [{ name: 'Main' }] });
      }).catch((err) => {
        console.log('만다라트를 수정할 수 없음:\n', err);
      })
    } else {
      await createMandalArt({
        target: mandalData[0],
        cycle_count: 0,
        cycle_term: mandalCycle,
        cycle_date: today(),
        sub_targets: mandalData.slice(1, 9).map((value) => value.trim()),
        detail_targets: mandalData.slice(9, 73).map((value) => value.trim()),
        theme: themeColor,
        theme_price: (ThemeSelector(themeColor) as MandalaArtThemeType).description.point
      }).then(() => {
        navigation.reset({ routes: [{ name: 'Main' }] });
      }).catch((err) => {
        console.log('만다라트를 생성할 수 없음:\n', err);
      })
    }
  }

  useEffect(() => {
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
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { paddingBottom: keyboardStatus ? 0 : 16 }]}>
        <TitleBar title="테마 선택" onPress={() => navigation.goBack()} />
        <View style={styles.contentBox}>
          <View style={styles.centerBox}>
            <CustomInput inputMode="numeric" text="달성 기록 주기" onChangeText={(text) => setMandalCycle(Number(text))} value={mandalCycle.toString()} icon={<Text style={[styles.gray, styles.text]}>일</Text>} />
            <Text style={[styles.text, styles.centerText]}>얼마나 자주 기록할지 목표를 설정해요</Text>
          </View>
          <CustomButton title="✔ 완료" onPress={onCreate} disabled={!mandalCycle} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default GoalCreateCycle;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  contentBox: {
    paddingHorizontal: 16,
    gap: 20,
    flex: 1
  },
  text: {
    fontSize: 16,
    fontFamily: '500',
  },
  centerText: {
    textAlign: 'center'
  },
  gray: {
    color: platte.gray50
  },
  centerBox: {
    gap: 20,
    flex: 10
  },
})