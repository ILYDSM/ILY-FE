import GoalCard from '@/components/GoalCard';
import PageTitle from '@/components/PageTitle';
import CustomButton from '@/components/common/CustomButton';
import { RootStackParam } from '@/utils/RootStackParam';
import ThemeSelector from '@/utils/ThemeSelector';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, View } from 'react-native';

const DemoData = [
  {
		"target":"관광통역안내사 취득",
    "isGroup": true,
    "theme": 'HighContrast'
	},
  {
		"target":"adsaf 취득2",
    "isGroup": true,
    "theme": 'LightPurple'
	},
  {
		"target":"sdafgs 취득3",
    "isGroup": false,
    "theme": 'Gray'
	},
  {
		"target":"asd 취득4",
    "isGroup": false,
    "theme": 'Teal'
	},
]

const Goal = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <>
      <PageTitle title="모든 목표" />
      <View style={{ paddingHorizontal: 16, gap: 16 }}>
        <CustomButton title="+  새 목표 만들기" size="M" onPress={() => navigation.navigate('Goal', { screen: 'GoalCreateMain' })}/>
          <FlatList
            data={DemoData}
            renderItem={(d)=>{
              const themeObject = ThemeSelector(d.item.theme) as MandalaArtThemeType;
              return <GoalCard isGroup={d.item.isGroup} text={d.item.target} theme={themeObject} key={d.index} onPress={() => navigation.navigate('Goal', { screen: 'GoalDetail' })}/>
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
