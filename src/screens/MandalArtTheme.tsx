import { SafeAreaView, StyleSheet, View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '@/utils/RootStackParam';
import TitleBar from '@/components/common/TitleBar';
import { platte } from '@/styles/platte';
import { PercentCircle } from 'lucide-react-native';
import MandalArtThemeCard from '@/components/common/MandalArt/MandalArtThemeCard';
import { useEffect, useState } from 'react';
import ThemeSelector from '@/utils/ThemeSelector';
import { profile } from '@/apis/user';

const MandalArtTheme = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [profileData, setProfileData] = useState<ProfileResponse>({
    nickname: '',
    email: '',
    point: '0',
    interests: [],
  });

  const getUserProfile = () => {
    profile()
      .then((res) => {
        setProfileData(res.data);
      })
      .catch((err) => {
        console.log('유저 프로필을 가져올 수 없음:\n', err);
      });
  };

  useEffect(() => {
    const getFn = navigation.addListener('focus', getUserProfile);
    return getFn;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <TitleBar title="테마 선택" onPress={() => navigation.goBack()} />
      <View style={styles.contentBox}>
        <View style={styles.borderBox}>
          <Text style={styles.pointTitle}>내 포인트</Text>
          <Text style={styles.text}>{Number(profileData.point).toLocaleString('ko-KR')}</Text>
          <PercentCircle size={20} color={platte.gray100} />
        </View>
        <FlatList
          data={ThemeSelector('All') as MandalaArtThemeType[]}
          renderItem={({ item }) => <MandalArtThemeCard theme={item} disabled={true} />}
          numColumns={2}
          keyExtractor={(_, index) => `${index}`}
          columnWrapperStyle={{ gap: 16 }}
          contentContainerStyle={{ gap: 16 }}
          style={{ flexGrow: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MandalArtTheme;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 16,
    flex: 1,
  },
  contentBox: {
    paddingHorizontal: 16,
    gap: 20,
    flex: 1,
  },
  pointTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  centerText: {
    textAlign: 'center',
  },
  borderBox: {
    borderWidth: 1,
    borderColor: platte.gray10,
    borderRadius: 12,
    padding: 12,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gap12: {
    gap: 12,
  },
});
