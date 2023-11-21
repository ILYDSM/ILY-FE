import { View, Text, FlatList, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParam } from "@/utils/RootStackParam";
import CustomButton from "./CustomButton";
import { Check } from "lucide-react-native";
import axios from "axios";
import { getItem } from "@/utils/AsyncStorage";
import { useEffect } from 'react';

interface PropsType {
  isTitle?: boolean;
}

const GoalCheck = ({ isTitle }: PropsType) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const GetGraphData = () => {
    return;
    const Token = getItem('userAccessToken');
    
    axios({
      // 아직 api 명세가 확실히 나오지 않아 데이터 설정은 안함
      url: `${process.env.EXPO_PUBLIC_API_URL}/user/graph`,
      headers: {
        "Authorization": `Bearer ${Token}`
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log('목표 달성 정보를 가져올 수 없음\n', err)
    })
 }

 const todayCheck = () => {
  return;
  const Token = getItem('userAccessToken');

  axios({
    // 아직 api 명세가 확실하지 않아 url은 임시입니다.
    url: `${process.env.EXPO_PUBLIC_API_URL}`,
    headers: {
      "Authorization": `Bearer ${Token}`
    }
  })
  .then((res) => {
    console.log(res)
    GetGraphData()
  })
  .catch((err) => {
    console.log('목표 달성 정보를 가져올 수 없음\n', err)
  })
 }

 useEffect(() => {
  GetGraphData()
 }, [])

  return (
    <View style={styles.contentBox}>
      {isTitle && <Text style={styles.title}>목표 달성</Text>}
      <FlatList
        data={[true, true, true, true, false, false, false]}
        renderItem={({ item }) => {
          if (item) {
            return (
              <View style={[styles.recordBox,styles.enabled]}>
                <Check size={20} color="#FFFFFF"/>
              </View>
            )
          }
          else {
            return (
              <View style={[styles.recordBox,styles.disabled]}/>
            )
          }
        }}
        keyExtractor={(_, index) => `${index}`}
        horizontal
      />
      <Text style={styles.title}>4일째 연속으로 기록함</Text>
      <View style={[styles.boxCover]}>
        <CustomButton title='오늘 달성 기록하기' size='M' color='Gray' onPress={() => todayCheck()} />
        <CustomButton title='자세히 보기' size='M' color='Transparent' onPress={() => navigation.navigate('Menu', { screen: 'GoalCalendar' })} />
      </View>
    </View>
  )
}

export default GoalCheck;

const styles = StyleSheet.create({
  contentBox: {
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    padding: 12,
    width: 'auto',
  },
  title: {
    fontSize: 20,
    fontFamily: "700"
  },
  boxCover: {
    gap: 8,
    alignItems: 'center',
    width: 'auto',
    flexDirection: 'row'
  },
  recordBox: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginRight: 4
  },
  enabled: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabled: {
    backgroundColor: '#CCCCCC',
  }
})