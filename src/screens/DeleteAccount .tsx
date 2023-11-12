import CustomInput from "@/components/common/CustomInput";
import TitleBar from "@/components/common/TitleBar";
import { RootStackParam } from "@/utils/RootStackParam";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Eye, EyeOff } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native"
import { useState } from "react";
import { platte } from "@/styles/platte";
import CustomButton from "@/components/common/CustomButton";

const DeleteAccount = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const handlePasswordEye = () => {
    setIsPasswordOpen((prev) => !prev);
  };
  
  const onSubmit = (data: any) => {
    console.log(data);
    navigation.reset({routes: [{name: 'Main'}]})
  }

  const passwordRule = {
    required: true,
    minLength: 8,
    maxLength: 20,
    pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/
  }

  return (
    <SafeAreaView style={styles.container}>
      <TitleBar title="계정 삭제" onPress={() => navigation.goBack()}/>
      <View style={styles.contentBox}>
        <Controller
          control={control}
          name="email"
          rules={passwordRule}
          render={({ field: { onChange, value }}) => (
            <CustomInput
              text="이메일"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordRule}
          render={({ field: { onChange, value }}) => (
            <CustomInput
              text="새 비밀번호"
              description="8~20자 이내, 알파벳 대소문자, 숫자를 포함해야 해요"
              onChangeText={onChange}
              value={value}
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
      <CustomButton title="→ 다음" onPress={handleSubmit(onSubmit)}/>
      </View>
    </SafeAreaView>
  )
}

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  contentBox: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 20,
    flex: 70
  },
  btnBox: {
    flexGrow: 1,
    paddingHorizontal: 16
  }
})