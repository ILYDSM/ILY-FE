import TitleBar from '@/components/common/TitleBar';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { platte } from '@/styles/platte';
import Category from '@/components/common/Category';
import CustomButton from '@/components/common/CustomButton';

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleBar title="관심사" onPress={() => navigation.goBack()} />
      <View style={{ flex: 1, paddingHorizontal: 16, gap: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: platte.gray100 }}>
          관심사를 선택하면 주제에 맞는 모임을 추천받을 수 있어요
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Category text="스포츠" />
          <Category text="스포츠" />
          <Category text="스포츠" />
          <Category text="스포츠" />
          <Category text="스포" />
          <Category text="스포츠" />
          <Category text="스츠" />
          <Category text="스포츠" />
          <Category text="스포" />
          <Category text="스포" />
          <Category text="스포" />
          <Category text="스포츠" />
        </View>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => navigation.navigate('ConfirmSignUp')}>
          <Text
            style={{
              textAlign: 'center',
              paddingHorizontal: 20,
              paddingVertical: 16,
              fontSize: 16,
              fontWeight: '400',
            }}
          >
            건너뛰기
          </Text>
        </TouchableOpacity>
        <CustomButton title="→ 다음" onPress={() => navigation.navigate('ConfirmSignUp')} />
      </View>
    </SafeAreaView>
  );
};
