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

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const handlePasswordEye = () => {
    setIsPasswordOpen((prev) => !prev);
  };

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
        <TitleBar
          title="회원가입 "
          onPress={() => {
            navigation.navigate('Rending');
          }}
        />
        <View style={{ flex: 1, paddingHorizontal: 16, gap: 20 }}>
          <CustomInput text="이메일" />
          <CustomInput
            text="비밀번호"
            description="8~20자 이내, 알파벳 대소문자, 숫자를 포함해야 해요"
            icon={
              <TouchableOpacity onPress={handlePasswordEye}>
                {isPasswordOpen ? <Eye color={platte.gray100} size={20} /> : <EyeOff color={platte.gray100} size={20} />}
              </TouchableOpacity>
            }
            secureTextEntry={!isPasswordOpen}
          />
          <CustomInput text="닉네임" description="최대 10글자까지 입력할 수 있어요" />
        </View>
        <View style={{ paddingHorizontal: 16, paddingBottom: keyboardStatus ? 0 : 16 }}>
          <CustomButton title="→ 다음" onPress={() => navigation.navigate('SelectInterest')} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
