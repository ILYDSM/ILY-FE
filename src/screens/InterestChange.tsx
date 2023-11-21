import Category from "@/components/common/Category";
import TitleBar from "@/components/common/TitleBar";
import { RootStackParam } from "@/utils/RootStackParam";
import { interestType } from "@/utils/Translates";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react"
import CustomButton from "@/components/common/CustomButton";
import { interest, profile } from '@/apis/user';

const InterestChange = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [categories, setCategories] = useState<InterestEnglishType[]>([]);

  const getUserProfile = () => {
    profile().then((res) => {
      setCategories(res.data.interests);
    })
      .catch((err) => {
        console.log('유저 프로필을 가져올 수 없음:\n', err);
      });
  };

  const onInterestChange = () => {
    interest({ interests: categories }).then((res) => {
      navigation.navigate('Main');
    })
  }

  useEffect(() => {
    const getFn = navigation.addListener('focus', getUserProfile);
    return getFn;
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <TitleBar title="관심사 수정" onPress={() => navigation.goBack()} />
      <View style={styles.contentCover}>
        <View style={styles.gap20}>
          <Text style={styles.text}>관심사를 선택하면 주제에 맞는 모임을 추천받을 수 있어요</Text>
          <View style={styles.contentBox}>
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
        <CustomButton title="완료" onPress={onInterestChange} />
      </View>
    </SafeAreaView>
  )
}

export default InterestChange;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 16,
    flex: 1
  },
  contentCover: {
    paddingHorizontal: 16,
    flex: 1
  },
  gap20: {
    gap: 20,
    flex: 1
  },
  text: {
    fontSize: 16,
    fontWeight: '500'
  },
  contentBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  }
})