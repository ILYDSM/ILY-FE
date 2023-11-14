import GoalCard from '@/components/GoalCard';
import PageTitle from '@/components/PageTitle';
import CustomButton from '@/components/common/CustomButton';
import { Text, View } from 'react-native';

const Goal = () => {
  return (
    <>
      <PageTitle title="모든 목표" />
      <View style={{ paddingHorizontal: 16, gap: 16 }}>
        <CustomButton title="+  새 목표 만들기" size="M" />
        <View style={{ gap: 12, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '48%' }}>
            <GoalCard text="관광통역안내사 취득" color="#339988" />
          </View>
          <View style={{ width: '48%' }}>
            <GoalCard text="관광통역안내사 취득" color="#339988" />
          </View>
        </View>
      </View>
    </>
  );
};

export default Goal;
