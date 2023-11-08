import CustomInput from '@/components/common/CustomInput';
import TitleBar from '@/components/common/TitleBar';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, View, Text, ScrollView, FlatList } from 'react-native';
import { platte } from '@/styles/platte';
import Category from '@/components/common/Category';
import MeetCard from '@/components/common/MeetCard';
import { DATA } from '@/constants/mock';
import Margin from '@/components/common/Margin';

const SearchResult = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleBar title="검색 결과" onPress={() => navigation.goBack()} />
      <View style={{ flex: 1, width: '100%', paddingHorizontal: 16, gap: 16 }}>
        <CustomInput
          text="검색"
          placeholder="모임찾기"
          icon={
            <TouchableOpacity onPress={() => {}}>
              <Search size={20} color={platte.gray50} />
            </TouchableOpacity>
          }
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ color: platte.gray50, fontSize: 16, fontWeight: '500' }}>분류</Text>
          <View>
            <ScrollView
              horizontal
              contentContainerStyle={{
                columnGap: 8,
              }}
            >
              <Category text="스포츠" />
              <Category text="스포츠" />
            </ScrollView>
          </View>
        </View>
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
    </SafeAreaView>
  );
};

export default SearchResult;
