import CustomButton from '@/components/common/CustomButton';
import CustomInput from '@/components/common/CustomInput';
import TitleBar from '@/components/common/TitleBar';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EyeOff, Eye } from 'lucide-react-native';
import { platte } from '@/styles/platte';
import { useState } from 'react';
import KakaoButton from '@/components/AuthButtons/KakaoButton';
import GoogleButton from '@/components/AuthButtons/GoogleButton';
import NaverButton from '@/components/AuthButtons/NaverButton';
import { useForm, Controller } from 'react-hook-form';

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const handlePasswordEye = () => {
    setIsPasswordOpen((prev) => !prev);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      secret_key: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleBar
        title="로그인"
        onPress={() => {
          navigation.navigate('Rending');
        }}
      />
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <View style={{ width: '90%', flex: 9 }}>
          <View style={{ flexDirection: 'column', gap: 20 }}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: '이메일은 필수입니다' },
                pattern: {
                  value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: '이메일 형식이 아닙니다.',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  text="이메일"
                  onChangeText={onChange}
                  value={value}
                  isError={!!errors.email}
                  description={errors.email?.message}
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
                maxLength: 20,
                pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  text="비밀번호"
                  description={
                    !!errors.secret_key?.message
                      ? errors.secret_key?.message
                      : '8~20자 이내, 알파벳 대소문자, 숫자를 포함해야 해요'
                  }
                  icon={
                    <TouchableOpacity onPress={handlePasswordEye}>
                      {isPasswordOpen ? (
                        <Eye color={platte.gray100} size={20} />
                      ) : (
                        <EyeOff color={platte.gray100} size={20} />
                      )}
                    </TouchableOpacity>
                  }
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!isPasswordOpen}
                  isError={!!errors.secret_key}
                />
              )}
              name="secret_key"
            />
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700' }}>다른 계정으로 시작하기</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <KakaoButton />
              <NaverButton />
              <GoogleButton />
            </View>
          </View>
        </View>
        <View style={{ width: '90%' }}>
          <TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: 20,
                paddingVertical: 16,
                fontSize: 16,
                fontWeight: '400',
              }}
            >
              비밀번호 바꾸기
            </Text>
          </TouchableOpacity>
          <CustomButton title="로그인" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
