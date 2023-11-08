import PageTitle from '@/components/PageTitle';
import CustomButton from '@/components/common/CustomButton';
import CustomInput from '@/components/common/CustomInput';
import Margin from '@/components/common/Margin';
import MeetCard from '@/components/common/MeetCard';
import { DATA } from '@/constants/mock';
import { platte } from '@/styles/platte';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search } from 'lucide-react-native';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Group = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <>
      <PageTitle title="모임" />
      <View style={{ flex: 1, width: '100%', paddingHorizontal: 16, gap: 16 }}>
        <CustomInput
          text="검색"
          placeholder="모임찾기"
          icon={
            <TouchableOpacity onPress={() => navigation.navigate('Group', { screen: 'SearchResult' })}>
              <Search size={20} color={platte.gray50} />
            </TouchableOpacity>
          }
        />
        <CustomButton
          title="관심사별 보기"
          size="M"
          color="Gray"
          onPress={() => navigation.navigate('Group', { screen: 'GroupCategory' })}
        />
        <CustomButton
          title="+ 새 모임 만들기"
          size="M"
          color="Black"
          onPress={() => navigation.navigate('Group', { screen: 'CreateGroup' })}
        />
        <Text style={styles.recommendText}>추천 모임</Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <>
              <MeetCard title={item.title} description={item.description} headCount={item.headCount} />
              <Margin height={16} />
            </>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

export default Group;

const styles = StyleSheet.create({
  recommendText: {
    color: platte.gray100,
    fontSize: 28,
    fontWeight: '700',
  },
});
