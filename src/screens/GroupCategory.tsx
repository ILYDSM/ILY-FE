import { viewCategoryGroup } from '@/apis/meet';
import Category from '@/components/common/Category';
import Margin from '@/components/common/Margin';
import MeetCard from '@/components/common/MeetCard';
import TitleBar from '@/components/common/TitleBar';
import { DATA } from '@/constants/mock';
import { platte } from '@/styles/platte';
import { RootStackParam } from '@/utils/RootStackParam';
import { interestType } from '@/utils/Translates';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GroupCategory = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [categories, setCategories] = useState<InterestEnglishType>('Sports');
  const [result, setResult] = useState<ViewAllResponse[]>([]);

  useEffect(() => {
    viewCategoryGroup(categories)
      .then((res) => setResult(res.data))
      .catch((err) => console.log(err));
  }, [categories]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleBar title="분류별로 보기" onPress={() => navigation.goBack()} />
      <View style={{ flex: 1, width: '100%', paddingHorizontal: 16, gap: 20 }}>
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
  );
};

export default GroupCategory;

const styles = StyleSheet.create({
  unit: {
    color: platte.gray10,
    fontSize: 16,
    fontFamily: '500',
  },
});
