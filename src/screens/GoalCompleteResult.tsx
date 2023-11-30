import { graph, weekGraph } from "@/apis/graph";
import CustomButton from "@/components/common/CustomButton";
import MandalArt from "@/components/common/MandalArt/MandalArt";
import TitleBar from "@/components/common/TitleBar";
import { RootStackParam } from "@/utils/RootStackParam";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Check } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, FlatList, Text } from "react-native"


const GoalCompleteResult = () => {
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

  useEffect(() => {
    const getFn = navigation.addListener('focus', () => {
      GetGraphData();
      GetGraphCount();
    });
    return getFn;
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <TitleBar title='목표 달성 기록' onPress={() => navigation.goBack()} />
      <View style={styles.contentBox}>
        <View style={styles.centerBox}>
          <View style={styles.mandalBox}>
            <MandalArt />
          </View>
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
          <Text style={styles.text}>{continueDays}일째 목표를 기록하고 있어요</Text>
        </View>
        <View style={styles.button}>
          <CustomButton title="→ 다음" onPress={() => navigation.reset({ routes: [{ name: 'Main' }] })}/>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default GoalCompleteResult;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flex: 1,
  },
  contentBox: {
    display: 'flex',
    paddingHorizontal: 16,
    gap: 20,
    flex: 1
  },
  centerBox: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mandalBox: {
    width: 156,
    height: 156
  },
  text: {
    fontSize: 20,
    fontFamily: '700',
    textAlign: 'center'
  },
  button: {
    flex: 1
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

function setContinueDays(continueCount: number) {
  throw new Error("Function not implemented.");
}


function setWeekData(arg0: boolean[]) {
  throw new Error("Function not implemented.");
}
