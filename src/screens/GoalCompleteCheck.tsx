import { completeMandalArt } from "@/apis/target";
import CustomButton from "@/components/common/CustomButton";
import CustomModal from "@/components/common/CustomModal";
import MandalArt from "@/components/common/MandalArt/MandalArt";
import TouchableMandalArt from "@/components/common/MandalArt/TouchableMandalArt";
import TitleBar from "@/components/common/TitleBar";
import { getItem } from "@/utils/AsyncStorage";
import { RootStackParam } from "@/utils/RootStackParam";
import ThemeSelector from "@/utils/ThemeSelector";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native"

const GoalCompleteCheck = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [detailMandalNumber, setDetailMandalNumber] = useState<number>(0)
  const [detailMandalData, setDetailMandalData] = useState<GetDetailMandalArtResponse[]>(Array.from({ length: 8 }, () => {
    return {
      id: 0,
      content: '',
      is_achieved: false,
      detail_target_responses: Array.from({ length: 8 }, () => {
        return {
          id: 0,
          content: '',
          is_achieved: false
        }
      })
    }
  }))
  const [mandalData, setMandalData] = useState<GetMandalArtResponse>({
    id: 0,
    content: '',
    cycle_count: 0,
    cycle_term: 0,
    cycle_date: '',
    is_achieved: false,
    theme: 'Gray',
    sub_target_response_list: Array.from({ length: 8 }, () => {
      return {
        id: 0,
        content: '',
        is_achieved: false
      }
    })
  })

  const GetMandalData = async () => {
    const dataJSON = await getItem('completeMandalData');
    if (dataJSON) {
      const data = JSON.parse(dataJSON);
      setMandalData(data[0])
      setDetailMandalData(data[1])
    }
  }

  const onComplete = () => {
    completeMandalArt({ detailTargetId: detailMandalData[detailMandalNumber].detail_target_responses[0].id }).then(() => {
      navigation.navigate('Goal', { screen: 'GoalCompleteResult' })
    }).catch((err) => {
      console.log('세부목표 달성하는데 실패했습니다.\n', err);
    })
  }

  const openDetailMandal = (num: number) => {
    setDetailMandalNumber(num);
    setOpenModal(true);
  }

  useEffect(() => {
    const getFn = navigation.addListener('focus', GetMandalData);
    return getFn;
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <TitleBar title='목표 달성 기록' onPress={() => navigation.goBack()} />
      <View style={styles.contentBox}>
        <TouchableMandalArt title={mandalData.content} data={mandalData.sub_target_response_list.map((value) => value.content)} theme={ThemeSelector(mandalData.theme)} onTouchFn={openDetailMandal} />
        <Text style={styles.text}>달성을 기록할 보조 목표를 선택하세요</Text>
      </View>
      <DetailMandalArt setState={setOpenModal} state={isOpenModal} theme={mandalData.theme} data={detailMandalData[detailMandalNumber]} onComplete={onComplete}/>
    </SafeAreaView>
  )
}

export default GoalCompleteCheck;

interface MandalArtModalType {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
  data: GetDetailMandalArtResponse;
  onComplete: () => void;
}

const DetailMandalArt = ({ state, setState, theme, data, onComplete }: MandalArtModalType) => {
  return (
    <CustomModal title="목표 달성을 기록할까요?" IsOpen={state} setIsOpen={setState}>
      <MandalArt title={data.content} data={data.detail_target_responses.map(value => value.content)} theme={ThemeSelector(theme)} />
      <CustomButton title="기록" onPress={onComplete} disabled={data.detail_target_responses[0].is_achieved}/>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16
  },
  contentBox: {
    display: 'flex',
    paddingHorizontal: 16,
    gap: 20
  },
  text: {
    fontSize: 16,
    fontFamily: '500',
    textAlign: 'center'
  }
})