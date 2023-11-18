import GoalCard from '@/components/GoalCard';
import PageTitle from '@/components/PageTitle';
import CustomButton from '@/components/common/CustomButton';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

const Goal = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <>
      <PageTitle title="모든 목표" />
      <View style={{ paddingHorizontal: 16, gap: 16 }}>
        <CustomButton title="+  새 목표 만들기" size="M" onPress={() => navigation.navigate('Goal', { screen: 'GoalCreateMain' })}/>
        <View style={{ gap: 12, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '48%' }}>
            <GoalCard text="관광통역안내사 취득" color="#339988" onPress={() => navigation.navigate('Goal', { screen: 'GoalDetail' })} theme="BlackPinkTheme"/>
          </View>
          <View style={{ width: '48%' }}>
            <GoalCard text="관광통역안내사 취득" color="#339988" theme="HighContrastTheme"/>
          </View>
        </View>
      </View>
    </>
  );
};

export default Goal;
