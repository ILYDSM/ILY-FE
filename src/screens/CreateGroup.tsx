import Category from '@/components/common/Category';
import CustomButton from '@/components/common/CustomButton';
import CustomInput from '@/components/common/CustomInput';
import CustomSwitch from '@/components/common/CustomSwitch';
import TitleBar from '@/components/common/TitleBar';
import { platte } from '@/styles/platte';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateGroup = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleBar title="새 모임 만들기" onPress={() => navigation.goBack()} />
      <View style={{ flex: 1, width: '100%', paddingHorizontal: 16, gap: 20 }}>
        <CustomInput text="이름" />
        <View style={{ gap: 8 }}>
          <CustomSwitch text="최대 인원 제한" />
          <CustomInput text="인원 제한" icon={<Text style={styles.unit}>명</Text>} />
        </View>
        <CustomInput
          text="설명"
          description={`모임을 설명할 수 있는 간단한 소갯말을 작성해 주세요\n14자까지 작성할 수 있어요`}
        />
        <View>
          <ScrollView
            horizontal
            contentContainerStyle={{
              columnGap: 8,
            }}
          >
            <Category text="스포츠" />
            <Category text="스포츠" />
            <Category text="스포츠" />
            <Category text="스포츠" />
            <Category text="스포츠" />
            <Category text="스포츠" />
            <Category text="스포츠" />
            <Category text="스포츠" />
          </ScrollView>
        </View>
      </View>
      <View style={{ width: '100%', paddingHorizontal: 16 }}>
        <CustomButton title="→ 다음" />
      </View>
    </SafeAreaView>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  unit: {
    color: platte.gray10,
    fontSize: 16,
    fontWeight: '500',
  },
});
