import CustomButton from '@/components/common/CustomButton';
import TitleBar from '@/components/common/TitleBar';
import { View, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '@/utils/RootStackParam';
import { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '@/components/common/CustomInput';
import { platte } from '@/styles/platte';

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true)
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false)
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1 }}>
        <TitleBar title="비밀번호 변경" onPress={() => navigation.goBack()} />
        <View
          style={{
            flex: 1,
            width: '100%',
            paddingHorizontal: 16,
            gap: 20,
          }}
        >
          <Text style={{ color: platte.gray100, fontSize: 16, fontWeight: '500' }}>
            본인 확인을 위해 가입할 때 사용한 이메일 인증이 필요해요
          </Text>
          <View style={{ flexDirection: 'column', gap: 20 }}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput text="이메일" onChangeText={onChange} value={value} autoComplete="email" />
              )}
            />
          </View>
        </View>
        <View style={{ width: '100%', paddingHorizontal: 16, paddingBottom: keyboardStatus ? 0 : 16 }}>
          <CustomButton
            title="→ 다음"
            onPress={() => {
              // handleSubmit(onSubmit);
              navigation.navigate('VerifyEmail');
            }}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
