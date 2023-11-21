import { SafeAreaView, StyleSheet, View, Text, ScrollView, Keyboard, TouchableWithoutFeedback, BackHandler } from "react-native";
import { useState, useEffect, useCallback } from "react";
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
  const [mandalData, setMandalData] = useState<string[]>([]);

  const subTitleChange = (subTitle: string[]) => {
    const data = [mandalData[0], ...subTitle, ...mandalData.slice(9)];
    setMandalData(data);
    setItem('mandalArtCreate', JSON.stringify(data));
  }

  const handlePressBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    }
    return false;
  }, [])

  const getData = async () => {
    const stringData = await getItem('mandalArtCreate');
    setMandalData(JSON.parse(stringData ?? "['','','','','','','','','','']"));
    return;
  }

  useEffect(() => {
    const dataFn = navigation.addListener('focus', () => {
      getData();
    });
    return dataFn;
  }, [navigation])

  useEffect(() => {
    const backHandlerFn = BackHandler.addEventListener('hardwareBackPress', handlePressBack);
    return () => backHandlerFn.remove();
  }, [BackHandler])

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
        <TitleBar title='보조 목표' onPress={() => navigation.goBack()} />
        <View style={styles.contentCover}>
          <ScrollView>
            <View style={styles.contentBox}>
              <MandalArtEdit
                title={mandalData[0]}
                data={mandalData.slice(1, 9)}
                onChangeData={subTitleChange}
              />
              <Text style={styles.text}>보조 목표 칸을 클릭해 입력하세요</Text>
            </View>
          </ScrollView>
          <CustomButton title='→ 다음' onPress={() => navigation.navigate('Goal', { screen: 'GoalCreateDetail' })} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default GoalCreateSub;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  contentCover: {
    paddingHorizontal: 16,
    flex: 1
  },
  contentBox: {
    gap: 20,
    flex: 10
  },
  text: {
    fontSize: 16,
    fontFamily: '500',
    textAlign: 'center'
  }
})