import { getTarget } from '@/apis/target';
import GoalCard from '@/components/GoalCard';
import PageTitle from '@/components/PageTitle';
import CustomButton from '@/components/common/CustomButton';
import { getItem, removeItem, setItem } from '@/utils/AsyncStorage';
import { RootStackParam } from '@/utils/RootStackParam';
import ThemeSelector from '@/utils/ThemeSelector';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';

const DemoData = [
  {
    id: 1,
		"content":"관광통역안내사 취득",
    "theme": 'HighContrast',
    "meet_id": null
	},
  {
    id: 1,
		"content":"관광통역안내사 취득",
    "theme": 'HighContrast',
    "meet_id": null
	},
]

const Goal = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [goalData, setGoalData] = useState<GetTargetResponse[]>([])

  const getGoals = () => {
    getTarget().then((res) => {
      setGoalData(res.data);
    })
      .catch((err) => {
        console.log('목표를 가져올 수 없음:\n', err);
      });
  };

  const onCreateMandalArt = async () => {
    await setItem('mandalType', JSON.stringify('create'));
    const data = await getItem('mandalArtCreate');
    if(data) {
      await removeItem('mandalArtCreate');
    }
    navigation.navigate('Goal', { screen: 'GoalCreateMain' })
  }

  useEffect(() => {
    const getFn = navigation.addListener('focus', getGoals);
    return getFn;
  }, [navigation])

  return (
    <>
      <PageTitle title="모든 목표" />
      <View style={{ paddingHorizontal: 16, gap: 16 }}>
        <CustomButton title="+  새 목표 만들기" size="M" onPress={onCreateMandalArt}/>
          <FlatList
            data={goalData}
            extraData={goalData}
            renderItem={(d)=>{
              const themeObject = ThemeSelector(d.item.theme) as MandalaArtThemeType;
              return <GoalCard isGroup={d.item.meet_id !== null} text={d.item.content} theme={themeObject} key={d.index} onPress={() => navigation.navigate('Goal', { screen: 'GoalDetail', params: { id: d.item.id, meet_id: d.item.meet_id } })}/>
            }}
            numColumns={2}
            columnWrapperStyle={{gap: 12}}
            contentContainerStyle={{gap: 12}}
            keyExtractor={(d,i)=> `${d.content}${i}`}
          />
      </View>
    </>
  );
};

export default Goal;
