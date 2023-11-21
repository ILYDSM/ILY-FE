import CustomInput from '@/components/common/CustomInput';
import TitleBar from '@/components/common/TitleBar';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, View, Text, ScrollView, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { platte } from '@/styles/platte';
import Category from '@/components/common/Category';
import MeetCard from '@/components/common/MeetCard';
import { DATA } from '@/constants/mock';
import Margin from '@/components/common/Margin';
import { interestType } from '@/utils/Translates';
import { useEffect, useState } from 'react';
import { viewCategorySearchGroup } from '@/apis/meet';

const SearchResult = ({ route }: { route: any }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [categories, setCategories] = useState<InterestEnglishType>('Sports');
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<ViewAllResponse[]>([]);

  useEffect(() => {
    setKeyword(route.params.keyword);
  }, [route]);

  useEffect(() => {
    viewCategorySearchGroup({ type: categories, keyword })
      .then((res) => setResult(res.data))
      .catch((err) => console.log(err));
  }, [keyword, categories]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1 }}>
        <TitleBar title="검색 결과" onPress={() => navigation.goBack()} />
        <View style={{ flex: 1, width: '100%', paddingHorizontal: 16, gap: 16 }}>
          <CustomInput
            text="검색"
            placeholder="모임찾기"
            onChangeText={(e) => setKeyword(e)}
            value={keyword}
            icon={
              <TouchableOpacity onPress={() => {}}>
                <Search size={20} color={platte.gray50} />
              </TouchableOpacity>
            }
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{ color: platte.gray50, fontSize: 16, fontFamily: '500' }}>분류</Text>
            <View>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  columnGap: 8,
                }}
              >
                {Object.entries(interestType).map((interest, index) => {
                  return (
                    <Category
                      key={index}
                      clicked={categories.includes(interest[1])}
                      text={interest[0]}
                      onPress={() => setCategories(interest[1])}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <FlatList
            data={result}
            renderItem={({ item }) => (
              <>
                <MeetCard title={item.title} description={item.content} headCount={item.participant} />
                <Margin height={16} />
              </>
            )}
            keyExtractor={(item, idx) => item.title + idx}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SearchResult;
