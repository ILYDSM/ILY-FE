import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParam } from "@/utils/RootStackParam";
import TitleBar from "@/components/common/TitleBar";
import { platte } from "@/styles/platte";
import { PercentCircle } from "lucide-react-native";
import CustomButton from "@/components/common/CustomButton";
import { MandalaArtTheme } from "@/types/theme";
import MandalArtThemeCard from "@/components/common/MandalArt/MandalArtThemeCard";
import { useState } from "react";

const GoalCreateTheme = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [themeColor, setThemeColor] = useState<string>('GrayTheme')

  const onCreate = () => {
    navigation.navigate('Main');
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
          <Text style={styles.text}>0000</Text>
          <PercentCircle size={20} color={platte.gray100}/>
        </View>
        <FlatList
          data={Object.keys(MandalaArtTheme)}
          renderItem={({ item }) =>
            <MandalArtThemeCard theme={item} isCheck={themeColor === item} onPress={() => setThemeColor(item)} />
          }
          numColumns={2}
          keyExtractor={(_, index) => `${index}`}
          columnWrapperStyle={{ gap: 16 }}
          contentContainerStyle={{ gap: 16 }}
          style={{ flexGrow: 1 }}
        />
        <CustomButton title="✔ 완료" onPress={onCreate} />
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
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
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