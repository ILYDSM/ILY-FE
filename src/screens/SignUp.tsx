import TitleBar from '@/components/common/TitleBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '@/utils/RootStackParam';
import { View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import CustomInput from '@/components/common/CustomInput';
import CustomButton from '@/components/common/CustomButton';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react-native';
import { platte } from '@/styles/platte';
import { Controller, useForm } from 'react-hook-form';
import { emailRule, nicknameRule, passwordRule } from '@/utils/Rules';

const SignUp = ({ route }: { route: any }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      interest: [],
    },
  });

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isOauth, setIsOauth] = useState(false);

  const handlePasswordEye = () => {
    setIsPasswordOpen((prev) => !prev);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    navigation.navigate('SelectInterest', data);
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

  useEffect(() => {
    console.log(route.params);
    if (route.params?.email) {
      setValue('email', route.params.email);
    }
    if (route.params?.password === '@ilydsm123') {
      setValue('password', route.params.password);
      setIsOauth(true);
    } else {
      setIsOauth(false);
    }
  }, [route]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1 }}>
        <TitleBar
          title="회원가입 "
          onPress={() => {
            navigation.navigate('Rending');
          }}
        />

        <View style={{ flex: 1, paddingHorizontal: 16, gap: 20 }}>
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
          {!isOauth && (
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
          )}
          <Controller
            control={control}
            rules={nicknameRule}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                text="닉네임"
                description="최대 10글자까지 입력할 수 있어요"
                onChangeText={onChange}
                value={value}
                isError={!!errors.nickname}
              />
            )}
            name="nickname"
          />
        </View>
        <View style={{ paddingHorizontal: 16, paddingBottom: keyboardStatus ? 0 : 16 }}>
          <CustomButton title="→ 다음" onPress={handleSubmit(onSubmit)} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
