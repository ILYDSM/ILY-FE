import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { PercentCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '@/utils/RootStackParam';
import CustomButton from '@/components/common/CustomButton';
import CardList from '@/components/common/CardList';
import { removeItem } from '@/utils/AsyncStorage';
import { useState, useEffect } from 'react';
import CustomModal from '@/components/common/CustomModal';
import GoalCheck from '@/components/common/GoalCheck';
import { profile, profileChange } from '@/apis/user';
import { Controller, useForm } from 'react-hook-form';
import { emailRule, nicknameRule } from '@/utils/Rules';
import CustomInput from '@/components/common/CustomInput';

const Menu = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<string>('logOut');
  const [profileData, setProfileData] = useState<ProfileResponse>({
    nickname: '',
    email: '',
    point: '0',
    interests: []
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: profileData.nickname,
      email: profileData.email,
    },
  });

  const { nickname, email } = watch();

  const getUserProfile = () => {
    profile().then((res) => {
        setProfileData(res.data);
      })
      .catch((err) => {
        console.log('유저 프로필을 가져올 수 없음:\n', err);
      });
  };

  const openModal = (status: string) => {
    setModalOpen(true);
    setModalStatus(status);
  }

  const onProfileChange = (data: ProfileChangeRequest) => {
    profileChange(data).then(() => {
      setModalOpen(false);
      getUserProfile();
    })
    .catch((err) => {
      console.log('유저 프로필을 변경할 수 없음:\n', err);
    })
  }

  const logOut = () => {
    removeItem('userAccessToken');
    navigation.reset({ routes: [{ name: 'Menu' }] });
    navigation.navigate('Rending');
  };

  useEffect(() => {
    const getFn = navigation.addListener('focus', getUserProfile);
    return getFn;
  }, [navigation])

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
            <CardList title="관심사 수정" onPress={() => navigation.navigate('Menu', { screen: 'InterestChange' })} />
            <CardList title="내 정보 수정" onPress={() => openModal('profileChange')} />
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
            <CardList title="로그아웃" onPress={() => openModal('logOut')} />
            <CardList title="계정 삭제" onPress={() => navigation.navigate('Menu', { screen: 'DeleteAccount' })} />
          </View>
        </View>
        <CustomModal IsOpen={isModalOpen} setIsOpen={setModalOpen} title={ modalStatus === 'logOut' ? "로그아웃할까요?" : "내 정보 수정"}>
          {
            modalStatus === 'logOut' ?
            <CustomButton title="로그아웃" onPress={logOut} />
            : modalStatus === 'profileChange' &&
            <View style={styles.gap12}>
              <Controller 
                control={control}
                name='nickname'
                rules={nicknameRule}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    text="닉네임"
                    onChangeText={onChange}
                    value={value}
                    isError={!!errors.nickname}
                  />
                )}
              />
              <Controller 
                control={control}
                name='email'
                rules={emailRule}
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    text="이메일"
                    onChangeText={onChange}
                    value={value}
                    isError={!!errors.email}
                  />
                )}
              />
              <CustomButton title="수정" onPress={() => handleSubmit(onProfileChange)} disabled={!email.match(emailRule.pattern.value) || nickname.length === 0 } />
            </View>
          }
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
    fontFamily: '700',
  },
  subTitle: {
    fontSize: 20,
    fontFamily: '700',
  },
  normalText: {
    fontSize: 14,
    fontFamily: '500',
  },
  grayText: {
    fontSize: 16,
    fontFamily: '500',
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
  gap12: {
    gap: 12
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
