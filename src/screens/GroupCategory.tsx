import Category from '@/components/common/Category';
import Margin from '@/components/common/Margin';
import MeetCard from '@/components/common/MeetCard';
import TitleBar from '@/components/common/TitleBar';
import { DATA } from '@/constants/mock';
import { platte } from '@/styles/platte';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GroupCategory = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

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
            <Category text="스포츠" clicked />
            <Category text="스포츠" />
            <Category text="스포츠" />
            <Category text="스포츠" />
            <Category text="스포츠" />
            <Category text="스포츠" />
            <Category text="스포츠" />
            <Category text="스포츠" />
          </ScrollView>
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

export default GroupCategory;

const styles = StyleSheet.create({
  unit: {
    color: platte.gray10,
    fontSize: 16,
    fontWeight: '500',
  },
});
