import CustomButton from '@/components/common/CustomButton';
import CustomInput from '@/components/common/CustomInput';
import TitleBar from '@/components/common/TitleBar';
import { platte } from '@/styles/platte';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '@/utils/RootStackParam';

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      verify_number: '',
    },
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleBar onPress={() => navigation.goBack()} title="이메일 인증" />
      <View
        style={{
          flex: 1,
          width: '100%',
          paddingHorizontal: 16,
          gap: 20,
        }}
      >
        <Text style={{ color: platte.gray100, fontSize: 16, fontWeight: '500' }}>
          mang5jelly@email.com로 인증 번호가 담긴 이메일을 보냈어요. ◾◾◾안에 입력해 주세요
        </Text>
        <View style={{ flexDirection: 'column', gap: 20 }}>
          <Controller
            control={control}
            name="verify_number"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <CustomInput text="인증 번호" onChangeText={onChange} value={value} />
            )}
          />
          <View>
            <CustomButton title="메일 앱 열기" size="M" />
          </View>
        </View>
      </View>
      <View style={{ width: '100%', paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => {}}>
          <Text
            style={{
              textAlign: 'center',
              paddingHorizontal: 20,
              paddingVertical: 16,
              color: platte.gray100,
              fontSize: 16,
              fontWeight: '400',
            }}
          >
            문제가 생겼나요?
          </Text>
        </TouchableOpacity>
        <CustomButton
          title="→ 다음"
          onPress={() => {
            // handleSubmit(onSubmit);
            navigation.navigate('NewPassword');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
