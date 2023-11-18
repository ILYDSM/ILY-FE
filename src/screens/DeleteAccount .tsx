import CustomInput from '@/components/common/CustomInput';
import TitleBar from '@/components/common/TitleBar';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Eye, EyeOff } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { platte } from '@/styles/platte';
import CustomButton from '@/components/common/CustomButton';
import CustomModal from '@/components/common/CustomModal';
import { emailRule, passwordRule } from '@/utils/Rules';

const DeleteAccount = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { email, password } = watch();

  const handlePasswordEye = () => {
    setIsPasswordOpen((prev) => !prev);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.reset({ routes: [{ name: 'Auth' }] });
  };

  const btnEnabledCheck = useMemo(() => {
    return !email.match(emailRule.pattern.value) || !password.match(passwordRule.pattern);
  }, [email, password]);

  const styles = stylesFn(keyboardStatus);

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
      <SafeAreaView style={styles.container}>
        <TitleBar title="계정 삭제" onPress={() => navigation.goBack()} />
        <View style={styles.contentBox}>
          <Controller
            control={control}
            name="email"
            rules={emailRule}
            render={({ field: { onChange, value } }) => (
              <CustomInput text="이메일" onChangeText={onChange} value={value} isError={!!errors.email} />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={passwordRule}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                text="비밀번호"
                description="8~20자 이내, 알파벳 대소문자, 숫자를 포함해야 해요"
                onChangeText={onChange}
                value={value}
                secureTextEntry={!isPasswordOpen}
                isError={!!errors.password}
                icon={
                  <TouchableOpacity onPress={() => handlePasswordEye()}>
                    {isPasswordOpen ? (
                      <Eye color={platte.gray50} size={20} />
                    ) : (
                      <EyeOff color={platte.gray50} size={20} />
                    )}
                  </TouchableOpacity>
                }
              />
            )}
          />
        </View>
        <View style={styles.btnBox}>
          <CustomButton title="→ 다음" onPress={() => setIsModalOpen(true)} disabled={btnEnabledCheck} />
        </View>
        <CustomModal title="정말 계정을 삭제할까요?" IsOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <CustomButton title="삭제" onPress={handleSubmit(onSubmit)} />
        </CustomModal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default DeleteAccount;

const stylesFn = (bool: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: 20,
      paddingBottom: bool ? 0 : 16,
      flex: 1,
    },
    contentBox: {
      width: '100%',
      paddingHorizontal: 16,
      gap: 20,
      flex: 10,
    },
    btnBox: {
      paddingHorizontal: 16,
    },
  });
