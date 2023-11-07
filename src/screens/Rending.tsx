import CustomButton from '@/components/common/CustomButton';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={{ flex: 1, width: '100%' }}>
      <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Image style={{ width: 64, height: 64 }} source={require('../../assets/ilyLogo.png')} />
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 28, fontWeight: '700' }}>
          {'ily 시작하는\n새로운 목표 관리'}
        </Text>
      </View>
      <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
          <View style={{ width: '50%' }}>
            <CustomButton size="L" color="Gray" title="회원가입" onPress={() => navigation.navigate('SignUp')} />
          </View>
          <View style={{ width: '50%' }}>
            <CustomButton size="L" color="Black" title="로그인" onPress={() => navigation.navigate('Login')} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
