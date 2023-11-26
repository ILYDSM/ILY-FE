import { View, Text, FlatList, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParam } from "@/utils/RootStackParam";
import CustomButton from "./CustomButton";
import { Check } from "lucide-react-native";
import { useEffect, useState } from 'react';
import { graph, weekGraph } from "@/apis/graph";

interface PropsType {
  isTitle?: boolean;
}

const GoalCheck = ({ isTitle }: PropsType) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [weekData, setWeekData] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const [continueDays, setContinueDays] = useState<number>(0)

  const GetGraphCount = async () => {
    await graph().then((res) => {
      const arrayData = res.data.map((data) => data.date);
      const sortedData = arrayData.sort((a, b) => {
        return new Date(b).getTime() - new Date(a).getTime()
      });

      const nowDate = new Date();
      const dayFn = (i: number) => new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + i)
      const twoWord = (num: number) => `0${num}`.slice(-2);
      const searchDataFn = (arr: Array<string>, date: Date) => arr.indexOf(`${date.getFullYear()}-${twoWord(date.getMonth() + 1)}-${twoWord(date.getDate())}`)

      let continueCount = 0
      for (let i = searchDataFn(sortedData, dayFn(0)); searchDataFn(sortedData, dayFn(i)) !== -1; i--) {
        continueCount++;
      }
      setContinueDays(continueCount);
    })
  }

  const GetGraphData = async () => {
    await weekGraph().then((res) => {
      const today = new Date().getDay();
      const response = res.data.days;
      const data = [
        response.indexOf('MONDAY') !== -1,
        response.indexOf('TUESDAY') !== -1,
        response.indexOf('WEDNESDAY') !== -1,
        response.indexOf('THURDAY') !== -1,
        response.indexOf('FRIDAY') !== -1,
        response.indexOf('SATURDAY') !== -1,
        response.indexOf('SUNDAY') !== -1
      ]
      setWeekData([...data.slice(today, 8 - today), ...data.slice(0, today)]);
    })
      .catch((err) => {
        console.log('목표 달성 정보를 가져올 수 없음\n', err)
      })
  }

  const todayCheck = () => {
    return;
  }

  useEffect(() => {
    const getFn = navigation.addListener('focus', () => {
      GetGraphData();
      GetGraphCount();
    });
    return getFn;
  }, [navigation])

  return (
    <View style={styles.contentBox}>
      {isTitle && <Text style={styles.title}>목표 달성</Text>}
      <FlatList
        data={weekData}
        extraData={weekData}
        renderItem={({ item }) => {
          if (item) {
            return (
              <View style={[styles.recordBox, styles.enabled]}>
                <Check size={20} color="#FFFFFF" />
              </View>
            )
          }
          else {
            return (
              <View style={[styles.recordBox, styles.disabled]} />
            )
          }
        }}
        keyExtractor={(_, index) => `${index}`}
        horizontal
      />
      <Text style={styles.title}>{continueDays}일째 연속으로 기록함</Text>
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