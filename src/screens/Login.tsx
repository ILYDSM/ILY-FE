import CustomButton from '@/components/common/CustomButton';
import CustomInput from '@/components/common/CustomInput';
import TitleBar from '@/components/common/TitleBar';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EyeOff, Eye } from 'lucide-react-native';
import { platte } from '@/styles/platte';
import { useState, useEffect } from 'react';
import KakaoButton from '@/components/AuthButtons/KakaoButton';
import GoogleButton from '@/components/AuthButtons/GoogleButton';
import NaverButton from '@/components/AuthButtons/NaverButton';
import { useForm, Controller } from 'react-hook-form';
import { login } from '@/apis/user';
import { emailRule, passwordRule } from '@/utils/Rules';
import { setItem } from '@/utils/AsyncStorage';

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
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
      password: '',
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    await login(data).then((res) => {
      setItem('access_token', res.data.access_token);
      setItem('refresh_token', res.data.refresh_token);
    });
    navigation.navigate('Main');
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                rules={emailRule}
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
                rules={passwordRule}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    text="비밀번호"
                    description={
                      !!errors.password?.message
                        ? errors.password?.message
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
                    isError={!!errors.password}
                  />
                )}
                name="password"
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
          <View style={{ width: '90%', marginBottom: keyboardStatus ? 0 : 16 }}>
            <TouchableOpacity onPress={() => navigation.navigate('ChangePwd')}>
              {/* <Text
                style={{
                  textAlign: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  fontSize: 16,
                  fontWeight: '400',
                }}
              >
                비밀번호 바꾸기
              </Text> */}
            </TouchableOpacity>
            <CustomButton title="로그인" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
