import { SafeAreaView, StyleSheet, View, Text, ScrollView, BackHandler } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParam } from "@/utils/RootStackParam";
import { getItem } from "@/utils/AsyncStorage";
import TitleBar from "@/components/common/TitleBar";
import CustomButton from "@/components/common/CustomButton";
import TouchableMandalArt from "@/components/common/MandalArt/TouchableMandalArt";
import CustomModal from "@/components/common/CustomModal";
import MandalArt from "@/components/common/MandalArt/MandalArt";

const GoalCreateResult = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [mandalData, setMandalData] = useState<string[]>([]);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [detailNumber, setDetailNumber] = useState<number>(0);

  const onDetailModal = (num: number) => {
    setDetailNumber(num);
    setOpenModal(true);
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
    setMandalData(JSON.parse(stringData ?? "[]"));
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TitleBar title='확인' onPress={() => navigation.goBack()} />
        <View style={styles.contentBox}>
          <TouchableMandalArt
            title={mandalData[0]}
            data={mandalData.slice(1, 9)}
            onTouchFn={onDetailModal}
          />
          <Text style={styles.text}>보조 목표 칸을 눌러 상세 목표를 확인할 수 있어요</Text>
        </View>
      </ScrollView>
      <CustomButton title='→ 다음' onPress={() => navigation.navigate('Goal', { screen: 'GoalCreateTheme' })} />
      <CustomModal IsOpen={isOpenModal} setIsOpen={setOpenModal}>
        <View style={styles.gap12}>
          <Text style={styles.detailText}>{mandalData[detailNumber + 1]}</Text>
          <MandalArt
            title={mandalData[detailNumber + 1]}
            data={mandalData.slice(9 + detailNumber * 8, 17 + detailNumber * 8)}
          />
        </View>
      </CustomModal>
    </SafeAreaView>
  )
}

export default GoalCreateResult;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
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
  },
  detailText: {
    fontSize: 26,
    fontWeight: '700'
  },
  gap12: {
    gap: 12
  }
})