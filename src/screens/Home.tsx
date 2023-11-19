import GoalCard from '@/components/GoalCard';
import PageTitle from '@/components/PageTitle';
import ViewAll from '@/components/ViewAll';
import GoalCheck from '@/components/common/GoalCheck';
import { GrayTheme } from '@/components/common/MandalArt/theme';
import MeetCard from '@/components/common/MeetCard';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, ScrollView, Text, View } from 'react-native';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <ScrollView>
      <PageTitle title="홈" />
      <View style={{ flexDirection: 'column', gap: 12, paddingHorizontal: 16 }}>
        <GoalCheck />
        <ViewAll title="이런 모임도 있어요">
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MeetCard />
            <MeetCard />
          </View>
        </ViewAll>
        <ViewAll title="즐겨찾기한 목표">
          <FlatList
            style={{ width: '100%', gap: 20 }}
            scrollEnabled={false}
            data={[
              { text: '관광통역안내사 취득', theme: GrayTheme },
              { text: '관광통역안내사 취득', theme: GrayTheme },
              { text: '관광통역안내사 취득', theme: GrayTheme },
            ]}
            renderItem={({ item }) => (
              <View style={{ width: '46%', margin: '2%' }}>
                <GoalCard text={item.text} theme={item.theme}/>
              </View>
            )}
            numColumns={2}
          />
        </ViewAll>
      </View>
    </ScrollView>
  );
};

export default Home;
