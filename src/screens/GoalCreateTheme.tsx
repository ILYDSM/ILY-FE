import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParam } from "@/utils/RootStackParam";
import TitleBar from "@/components/common/TitleBar";
import { platte } from "@/styles/platte";
import { PercentCircle } from "lucide-react-native";
import CustomButton from "@/components/common/CustomButton";
import MandalArtThemeCard from "@/components/common/MandalArt/MandalArtThemeCard";
import { useEffect, useState } from "react";
import ThemeSelector from "@/utils/ThemeSelector";
import { createMandalArt } from "@/apis/target";
import { getItem, setItem } from "@/utils/AsyncStorage";
import { profile } from "@/apis/user";

const GoalCreateTheme = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [themeColor, setThemeColor] = useState<string>('Gray')
  const [point, setPoint] = useState<number>(0);

  const getData = async () => {
    const themeData = await getItem('mandalTheme');
    if(themeData) {
      setThemeColor(themeData)
    }

    await profile().then((res) => {
      setPoint(Number(res.data.point));
    });

    return;
  }

  useEffect(() => {
    const dataFn = navigation.addListener('focus', () => {
      getData();
    });
    return dataFn;
  }, [navigation]);

  const selectTheme = async (theme: string) => {
    setThemeColor(theme)
    await setItem('mandalTheme', theme);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TitleBar title="테마 선택" onPress={() => navigation.goBack()} />
      <View style={styles.contentBox}>
        <View>
          <Text style={[styles.centerText, styles.text]}>아래에서 테마를 선택하세요</Text>
          <Text style={[styles.centerText, styles.text]}>테마는 수정할 수 없어요</Text>
        </View>
        <View style={styles.borderBox}>
          <Text style={styles.pointTitle}>내 포인트</Text>
          <Text style={styles.text}>{point.toLocaleString('ko-KR')}</Text>
          <PercentCircle size={20} color={platte.gray100}/>
        </View>
        <FlatList
          data={ThemeSelector('All') as MandalaArtThemeType[]}
          renderItem={({ item }) =>
            <MandalArtThemeCard theme={item} isCheck={themeColor === item.description.name} onPress={() => selectTheme(item.description.name)} disabled={point < item.description.point}/>
          }
          numColumns={2}
          keyExtractor={(_, index) => `${index}`}
          columnWrapperStyle={{ gap: 16 }}
          contentContainerStyle={{ gap: 16 }}
          style={{ flexGrow: 1 }}
        />
        <CustomButton title="→ 다음" onPress={() => navigation.navigate('Goal', { screen: 'GoalCreateCycle' })} />
      </View>
    </SafeAreaView>
  )
}

export default GoalCreateTheme;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 16,
    flex: 1
  },
  contentBox: {
    paddingHorizontal: 16,
    gap: 20,
    flex: 1
  },
  pointTitle: {
    fontSize: 20,
    fontFamily: '700',
  },
  text: {
    fontSize: 16,
    fontFamily: '500',
  },
  centerText: {
    textAlign: 'center'
  },
  borderBox: {
    borderWidth: 1,
    borderColor: platte.gray10,
    borderRadius: 12,
    padding: 12,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  gap12: {
    gap: 12
  }
})