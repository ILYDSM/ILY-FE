import TitleBar from '@/components/common/TitleBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '@/utils/RootStackParam';

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView>
      <TitleBar
        title="회원가입 "
        onPress={() => {
          navigation.navigate('Rending');
        }}
      />
    </SafeAreaView>
  );
};

export default SignUp;
