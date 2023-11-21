import PageTitle from '@/components/PageTitle';
import TitleBar from '@/components/common/TitleBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '@/utils/RootStackParam';
import { Check } from 'lucide-react-native';
import { platte } from '@/styles/platte';

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageTitle title="비밀번호 바꾸기" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <View style={{ padding: 16, backgroundColor: platte.gray80, borderRadius: 80 }}>
          <Check size={48} color={platte.gray00} />
        </View>
        <Text style={{ fontSize: 20, fontFamily: '700', color: platte.gray100 }}>비밀번호를 바꿨어요</Text>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <CustomButton
          title="완료"
          onPress={() => {
            // handleSubmit(onSubmit);
            navigation.reset({ routes: [{ name: 'Main' }] });
          }}
        />
      </View>
    </SafeAreaView>
  );
};
