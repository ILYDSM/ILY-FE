import { graph } from '@/apis/graph';
import TitleBar from '@/components/common/TitleBar';
import { platte } from '@/styles/platte';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

interface ItemPropsType {
  size: number;
  day: number;
  isCheck: boolean;
}

const Item = ({ size, day, isCheck }: ItemPropsType) => {
  return (
    <View style={[styles.recordBox, styles[isCheck ? 'enabled' : 'disabled'], {
      width: size,
      height: size
    }]}>
      <Text style={styles.recordText}>{day}</Text>
    </View>
  )
}

interface CalendarType {
  title: string;
  dates: CheckType[]
}

interface CheckType {
  day: number;
  isCheck: boolean;
}

const GoalCalendar = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const windowSize = Dimensions.get('window');
  const numColumns = 7;
  const [calendarData, setCalendarData] = useState<CalendarType[]>([])

  useEffect(() => {
    GetData()
  }, [])

  const GetData = () => {
    graph().then((res) => {
      console.log(res.data)
      const arrayData = res.data.map((data) => data.date);
      DataChecking(arrayData)
    })
  }
  
  const DataChecking = (data?: string[]) => {
    const sortedData = data?.sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime()
    }) || []
    const nowDate = new Date();
    const firstDate = sortedData.at(-1) ? new Date(sortedData.at(-1) as string) : new Date();
    let dataSliceTmp = 0;
    const length = (nowDate.getFullYear() - firstDate.getFullYear()) * 12 + (nowDate.getMonth() - firstDate.getMonth()) + 1

    setCalendarData(Array.from({ length }, (_, index) => {
      const date = new Date(nowDate.getFullYear(), nowDate.getMonth() - index + 1, 0)
      const maxDay = index ? date.getDate() : nowDate.getDate();
      const year = date.getFullYear()
      const month = date.getMonth() + 1;
      const twoMonth = `0${month}`.slice(-2)
      const data = sortedData.slice(dataSliceTmp).filter(value => value.match(`${year}-${twoMonth}`));
      dataSliceTmp += data.length;
      
      return {
        title: `${nowDate.getFullYear() !== year ? `${year}년 ` : ''}${month}월`,
        dates: Array.from({ length: maxDay }, (_, index) => {
          const twoDay = `0${maxDay - index}`.slice(-2)
          return {
            day: maxDay - index,
            isCheck: data.indexOf(`${year}-${twoMonth}-${twoDay}`) !== -1
          }
        })
      }
    }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TitleBar title='목표 달성 달력' onPress={() => navigation.goBack()} />
        <View style={styles.contentBox}>
          <View style={styles.borderBox}>
            <Text style={styles.checkText}>14일 연속으로 달성 중</Text>
          </View>
          {
            calendarData.map((data, index) => (
              <View style={styles.calendarBox} key={index}>
                <Text style={styles.recordTitle}>{data.title}</Text>
                <FlatList
                  data={data.dates}
                  renderItem={({ item }) => (
                    <Item size={(windowSize.width - 60) / numColumns} day={item.day} isCheck={item.isCheck} />
                  )}
                  numColumns={7}
                  keyExtractor={(_, index) => `${index}`}
                  ItemSeparatorComponent={() => <View style={styles.rowGap} />}
                  columnWrapperStyle={styles.cloumnGap}
                  scrollEnabled={false}
                />
              </View>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default GoalCalendar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    width: '100%'
  },
  contentBox: {
    gap: 10,
    width: '100%'
  },
  borderBox: {
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: platte.gray10,
    padding: 12,
  },
  checkText: {
    fontSize: 20,
    fontWeight: '700'
  },
  calendarBox: {
    gap: 4,
    width: '100%'
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '700'
  },
  recordBox: {
    width: 51,
    height: 51,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  enabled: {
    backgroundColor: '#000000',
  },
  disabled: {
    backgroundColor: '#B3B3B3',
  },
  rowGap: {
    height: 4
  },
  cloumnGap: {
    gap: 4
  }
})

const Data = [
  "2023-05-01",
  "2023-05-05",
  "2023-05-17",
  "2023-05-01",
  "2023-05-10",
  "2023-06-23",
  "2023-09-23",
  "2023-10-14",
  "2023-11-14",
  "2023-11-10",
  "2023-11-01",
  "2023-10-17",
  "2022-10-17",
]