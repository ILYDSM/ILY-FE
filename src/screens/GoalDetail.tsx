import CustomButton from "@/components/common/CustomButton";
import MandalArt from "@/components/common/MandalArt/MandalArt";
import { HighContrastTheme } from "@/components/common/MandalArt/theme";
import TitleBar from "@/components/common/TitleBar";
import { RootStackParam } from "@/utils/RootStackParam";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, StatusBar, View } from "react-native";

const DemoData = {
  title: '관광통역안내사 탈환',
  data: ['공부하기', '매일 기록하기', '내일 기록하기', '아 오늘만쉬기']
}

export default function GoalDetailScreen(){
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return(
    <>
      <TitleBar title="관광통역안내사 탈취" onPress={()=>navigation.goBack()}/>
      <View style={{paddingHorizontal: 16, gap: 16}}>
        <MandalArt title={DemoData.title} data={DemoData.data} theme={HighContrastTheme}/>
        <CustomButton title="목표 달성 기록"/>
        <CustomButton title="목표 편집" color="Transparent"/>
      </View>
    </>
  )
}