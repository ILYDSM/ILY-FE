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
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react-native';

type EyeType = { password: boolean; new_password: boolean };

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: '',
      new_password: '',
    },
  });

  const [isOpen, setIsOpen] = useState<EyeType>({
    password: false,
    new_password: false,
  });

  const handlePasswordEye = (type: keyof EyeType) => {
    setIsOpen((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleBar onPress={() => navigation.goBack()} title="새 비밀번호 입력" />
      <View
        style={{
          flex: 1,
          width: '100%',
          paddingHorizontal: 16,
          gap: 20,
        }}
      >
        <View style={{ flexDirection: 'column', gap: 20 }}>
          <Controller
            control={control}
            name="password"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                text="기존 비밀번호"
                onChangeText={onChange}
                value={value}
                icon={
                  <TouchableOpacity onPress={() => handlePasswordEye('password')}>
                    {isOpen.password ? (
                      <Eye color={platte.gray100} size={20} />
                    ) : (
                      <EyeOff color={platte.gray100} size={20} />
                    )}
                  </TouchableOpacity>
                }
              />
            )}
          />
          <Controller
            control={control}
            name="new_password"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                text="새 비밀번호"
                description="8~20자 이내, 알파벳 대소문자, 숫자를 포함해야 해요"
                onChangeText={onChange}
                value={value}
                icon={
                  <TouchableOpacity onPress={() => handlePasswordEye('new_password')}>
                    {isOpen.new_password ? (
                      <Eye color={platte.gray100} size={20} />
                    ) : (
                      <EyeOff color={platte.gray100} size={20} />
                    )}
                  </TouchableOpacity>
                }
              />
            )}
          />
        </View>
      </View>
      <View style={{ width: '100%', paddingHorizontal: 16 }}>
        <CustomButton
          title="→ 다음"
          onPress={() => {
            // handleSubmit(onSubmit);
            navigation.reset({ routes: [{ name: 'ConfirmChangePwd' }] });
          }}
        />
      </View>
    </SafeAreaView>
  );
};
