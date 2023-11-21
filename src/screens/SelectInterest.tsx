import TitleBar from '@/components/common/TitleBar';
import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { platte } from '@/styles/platte';
import Category from '@/components/common/Category';
import CustomButton from '@/components/common/CustomButton';
import { useEffect, useState } from 'react';
import { signUp } from '@/apis/user';
import { interestType } from '@/utils/Translates';

export default ({ route }: { route: any }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [categories, setCategories] = useState<InterestEnglishType[]>([]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleBar title="관심사" onPress={() => navigation.goBack()} />
      <View style={{ flex: 1, paddingHorizontal: 16, gap: 20 }}>
        <Text style={{ fontSize: 16, fontFamily: '500', color: platte.gray100 }}>
          관심사를 선택하면 주제에 맞는 모임을 추천받을 수 있어요
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {Object.entries(interestType).map((interest, index) => {
            return (
              <Category
                key={index}
                clicked={categories.includes(interest[1])}
                text={interest[0]}
                onPress={() =>
                  setCategories(
                    categories.includes(interest[1])
                      ? categories.filter((category) => category !== interest[1])
                      : [...categories, interest[1]],
                  )
                }
              />
            );
          })}
        </View>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => navigation.navigate('ConfirmSignUp')}>
          <Text
            style={{
              textAlign: 'center',
              paddingHorizontal: 20,
              paddingVertical: 16,
              fontSize: 16,
              fontFamily: '400',
            }}
          >
            건너뛰기
          </Text>
        </TouchableOpacity>
        <CustomButton
          title="→ 다음"
          onPress={async () => {
            await signUp({ ...route.params, interest: categories });
            navigation.navigate('ConfirmSignUp');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
