import CustomInput from "@/components/common/CustomInput";
import TitleBar from "@/components/common/TitleBar";
import { RootStackParam } from "@/utils/RootStackParam";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Eye, EyeOff } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native"
import { useState, useEffect, useMemo } from "react";
import { platte } from "@/styles/platte";
import CustomButton from "@/components/common/CustomButton";

type EyeType = { password: boolean; new_password: boolean };

const MenuChangePwd = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<EyeType>({
    password: false,
    new_password: false,
  });

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      password: '',
      new_password: '',
    },
  });

  const { password, new_password } = watch();

  const handlePasswordEye = (type: keyof EyeType) => {
    setIsOpen((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.reset({ routes: [{ name: 'Main' }] })
  }

  const passwordRule = {
    required: true,
    minLength: 8,
    maxLength: 20,
    pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/
  }

  const btnEnabledCheck = useMemo(() => {
    if (!password.match(passwordRule.pattern)) return true;
    if (!new_password.match(passwordRule.pattern)) return true;
    return false;
  }, [password, new_password])

  const styles = stylesFn(keyboardStatus);

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
      <SafeAreaView style={styles.container}>
        <TitleBar title="비밀번호 바꾸기" onPress={() => navigation.goBack()} />
        <View style={styles.contentBox}>
          <Controller
            control={control}
            name="password"
            rules={passwordRule}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                text="기존 비밀번호"
                onChangeText={onChange}
                value={value}
                secureTextEntry={!isOpen.password}
                isError={!!errors.password}
                icon={
                  <TouchableOpacity onPress={() => handlePasswordEye('password')}>
                    {isOpen.password ? (
                      <Eye color={platte.gray50} size={20} />
                    ) : (
                      <EyeOff color={platte.gray50} size={20} />
                    )}
                  </TouchableOpacity>
                }
              />
            )}
          />
          <Controller
            control={control}
            name="new_password"
            rules={passwordRule}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                text="새 비밀번호"
                description="8~20자 이내, 알파벳 대소문자, 숫자를 포함해야 해요"
                onChangeText={onChange}
                value={value}
                secureTextEntry={!isOpen.new_password}
                isError={!!errors.new_password}
                icon={
                  <TouchableOpacity onPress={() => handlePasswordEye('new_password')}>
                    {isOpen.new_password ? (
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
          <CustomButton title="→ 다음" onPress={handleSubmit(onSubmit)} disabled={btnEnabledCheck} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default MenuChangePwd;

const stylesFn = (bool: boolean) => StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: bool ? 0 : 16,
    flex: 1
  },
  contentBox: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 20,
    flex: 10
  },
  btnBox: {
    paddingHorizontal: 16
  }
})