import { SafeAreaView, StyleSheet, View, Text, ScrollView, BackHandler, Dimensions } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParam } from "@/utils/RootStackParam";
import { getItem, setItem } from "@/utils/AsyncStorage";
import TitleBar from "@/components/common/TitleBar";
import CustomButton from "@/components/common/CustomButton";
import TouchableMandalArt from "@/components/common/MandalArt/TouchableMandalArt";
import CustomModal from "@/components/common/CustomModal";
import CustomInput from "@/components/common/CustomInput";

const GoalCreateDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [mandalData, setMandalData] = useState<string[]>([]);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [detailNumber, setDetailNumber] = useState<number>(0);
  const windowSize = Dimensions.get('window');

  const onDetailModal = (num: number) => {
    setDetailNumber(num);
    setOpenModal(true);
  }

  const detailTextChange = (detailText: string, index: number) => {
    const data = [...mandalData.slice(0, 9 + detailNumber * 8 + index), detailText, ...mandalData.slice(10 + detailNumber * 8 + index)];
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TitleBar title='상세 목표' onPress={() => navigation.goBack()} />
        <View style={styles.contentBox}>
          <TouchableMandalArt
            title={mandalData[0]}
            data={mandalData.slice(1, 9)}
            onTouchFn={onDetailModal}
          />
          <Text style={styles.text}>보조 목표 칸을 클릭해 상세 목표를 입력하세요</Text>
        </View>
      </ScrollView>
      <CustomButton title='→ 다음' onPress={() => navigation.navigate('Goal', { screen: 'GoalCreateResult' })} />
      <CustomModal IsOpen={isOpenModal} setIsOpen={setOpenModal}>
        <View style={[styles.gap12, { height: windowSize.height / 2 - 115 }]}>
          <Text style={styles.detailText}>{mandalData[detailNumber + 1]}</Text>
          <ScrollView contentContainerStyle={styles.gap12}>
            <CustomInput text='상세 목표 1' onChangeText={(text: string) => detailTextChange(text, 0)} value={mandalData[9 + detailNumber * 8]} />
            <CustomInput text='상세 목표 2' onChangeText={(text: string) => detailTextChange(text, 1)} value={mandalData[10 + detailNumber * 8]} />
            <CustomInput text='상세 목표 3' onChangeText={(text: string) => detailTextChange(text, 2)} value={mandalData[11 + detailNumber * 8]} />
            <CustomInput text='상세 목표 4' onChangeText={(text: string) => detailTextChange(text, 3)} value={mandalData[12 + detailNumber * 8]} />
            <CustomInput text='상세 목표 5' onChangeText={(text: string) => detailTextChange(text, 4)} value={mandalData[13 + detailNumber * 8]} />
            <CustomInput text='상세 목표 6' onChangeText={(text: string) => detailTextChange(text, 5)} value={mandalData[14 + detailNumber * 8]} />
            <CustomInput text='상세 목표 7' onChangeText={(text: string) => detailTextChange(text, 6)} value={mandalData[15 + detailNumber * 8]} />
            <CustomInput text='상세 목표 8' onChangeText={(text: string) => detailTextChange(text, 7)} value={mandalData[16 + detailNumber * 8]} />
          </ScrollView>
        </View>
      </CustomModal>
    </SafeAreaView>
  )
}

export default GoalCreateDetail;

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
  detailCover: {
    gap: 12,
    height: 285
  },
  gap12: {
    gap: 12
  }
})