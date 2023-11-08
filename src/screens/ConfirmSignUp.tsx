import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '@/utils/RootStackParam';

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 32, fontWeight: '700' }}>ily 시작하기</Text>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <CustomButton
          title="시작"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
