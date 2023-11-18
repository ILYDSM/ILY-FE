import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { PercentCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '@/utils/RootStackParam';
import CustomButton from '@/components/common/CustomButton';
import CardList from '@/components/common/CardList';
import { getItem, removeItem } from '@/utils/AsyncStorage';
import axios from 'axios';
import { useState } from 'react';
import CustomModal from '@/components/common/CustomModal';
import GoalCheck from '@/components/common/GoalCheck';

interface profileDataTypes {
  nickname: string;
  email: string;
  point: string;
}

const Menu = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<profileDataTypes>({
    nickname: '닉네임',
    email: 'asdf@gmail.com',
    point: '100',
  });

  const getUserProfile = () => {
    return;
    const Token = getItem('userAccessToken');

    axios({
      url: `${process.env.EXPO_PUBLIC_API_URL}/user/profile/${'user_id'}`,
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        setProfileData(res.data);
      })
      .catch((err) => {
        console.log('유저 프로필을 가져올 수 없음:\n', err);
      });
  };

  const LogOut = () => {
    removeItem('userAccessToken');
    navigation.reset({ routes: [{ name: 'Menu' }] });
    navigation.navigate('Rending');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>메뉴</Text>
        </View>
        <View style={styles.contentCover}>
          <View style={styles.ContentBox}>
            <Image
              style={styles.userImage}
              source={{
                // 아래 사진 uri는 임시 입니다.
                uri: 'https://avatars.githubusercontent.com/u/143332497?s=200&v=4',
              }}
              alt="유저 사진"
            />
            <Text style={styles.subTitle}>{profileData.nickname}</Text>
            <Text style={styles.grayText}>{profileData.email}</Text>
            <CardList title="관심사 수정" onPress={() => {}} />
          </View>
          <GoalCheck isTitle />
          <View style={styles.ContentBox}>
            <Text style={styles.subTitle}>내 포인트</Text>
            <View style={styles.boxCover}>
              <PercentCircle size={20} color="#000000" />
              <Text style={styles.normalText}>{Number(profileData.point).toLocaleString('ko-KR')}</Text>
            </View>
            <View style={styles.line} />
            <CardList title="만다라트 테마" onPress={() => navigation.navigate('Menu', { screen: 'MandalArtTheme' })} />
          </View>
          <View style={styles.ContentBox}>
            <CardList title="비밀번호 변경" onPress={() => navigation.navigate('Menu', { screen: 'MenuChangePwd' })} />
            <CardList title="로그아웃" onPress={() => setModalOpen(true)} />
            <CardList title="계정 삭제" onPress={() => navigation.navigate('Menu', { screen: 'DeleteAccount' })} />
          </View>
        </View>
        <CustomModal IsOpen={isModalOpen} setIsOpen={setModalOpen} title="로그아웃할까요?">
          <CustomButton title="로그아웃" onPress={LogOut} />
        </CustomModal>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
    width: Dimensions.get('window').width,
  },
  titleBox: {
    marginVertical: 20,
    width: Dimensions.get('window').width - 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  normalText: {
    fontSize: 14,
    fontWeight: '500',
  },
  grayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#808080',
  },
  contentCover: {
    gap: 12,
    width: Dimensions.get('window').width - 32,
  },
  ContentBox: {
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    padding: 12,
    width: 'auto',
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 50,
    objectFit: 'cover',
  },
  gap8: {
    gap: 8,
  },
  boxCover: {
    gap: 4,
    alignItems: 'center',
    width: 'auto',
    flexDirection: 'row',
  },
  recordBox: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginRight: 4,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#E6E6E6',
    width: 'auto',
  },
});
