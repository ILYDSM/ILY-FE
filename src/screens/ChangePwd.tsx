import CustomButton from '@/components/common/CustomButton';
import TitleBar from '@/components/common/TitleBar';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '@/utils/RootStackParam';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '@/components/common/CustomInput';
import { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react-native';
import { platte } from '@/styles/platte';

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      secret_key: '',
    },
  });

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const handlePasswordEye = () => {
    setIsPasswordOpen((prev) => !prev);
  };

  return (
    <SafeAreaView>
      <TitleBar title="비밀번호 변경" />
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
              name="email"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput text="이메일" onChangeText={onChange} value={value} autoComplete="email" />
              )}
            />
            <Controller
              control={control}
              name="secret_key"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  text="비밀번호"
                  description="8~20자 이내, 알파벳 대소문자, 숫자를 포함해야 해요"
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
                  autoComplete="password"
                />
              )}
            />
          </View>
        </View>
        <View style={{ width: '90%' }}>
          <CustomButton
            disabled
            title="로그인"
            onPress={() => {
              // handleSubmit(onSubmit);
              navigation.navigate('Main');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
