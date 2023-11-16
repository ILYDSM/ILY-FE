import GoalCard from '@/components/GoalCard';
import PageTitle from '@/components/PageTitle';
import CustomButton from '@/components/common/CustomButton';
import { BlackPinkTheme, HighContrastTheme } from '@/components/common/MandalArt/theme';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const DemoData = [
  {
		"target":"관광통역안내사 취득",
    "isGroup": true,
	},
  {
		"target":"adsaf 취득2",
    "isGroup": false,
	},
  {
		"target":"sdafgs 취득3",
    "isGroup": false,
	},
  {
		"target":"asd 취득4",
    "isGroup": false,
	},
]

const Goal = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <>
      <PageTitle title="모든 목표" />
      <View style={{ paddingHorizontal: 16, gap: 16 }}>
        <CustomButton title="+  새 목표 만들기" size="M" />
          <FlatList
            data={DemoData}
            renderItem={(d)=>{
              return <GoalCard text={d.item.target} theme={HighContrastTheme} key={d.index} onPress={() => navigation.navigate('Goal', { screen: 'GoalDetail' })}/>
            }}
            numColumns={2}
            columnWrapperStyle={{gap: 12}}
            contentContainerStyle={{gap: 12}}
            keyExtractor={(d,i)=> `${d.target}${i}`}
          />
      </View>
    </>
  );
};

export default Goal;
