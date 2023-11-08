import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { PercentCircle } from 'lucide-react-native';
import CustomButton from '@/components/common/CustomButton';
import CardList from '@/components/common/CardList';

const Menu = () => {
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
                uri: 'https://avatars.githubusercontent.com/u/143332497?s=200&v=4'
              }}
              alt='유저 사진'
            />
            <Text style={styles.subTitle}>대충 이름</Text>
            <Text style={styles.grayText}>누군가의 이메일</Text>
            <CardList title='관심사 수정' onPress={() => { }} />
          </View>
          <View style={styles.ContentBox}>
            <Text style={styles.subTitle}>대충 이름</Text>
            <FlatList
              data={[true, true, true, true, false, false, false]}
              renderItem={({ item }) => (
                <View style={[
                  styles.recordBox,
                  {
                    backgroundColor: item ? '#000000' : '#CCCCCC'
                  }]}
                />
              )}
              keyExtractor={(_, index) => `${index}`}
              horizontal={true}
            />
            <Text style={styles.subTitle}>4일째 어쩌고 기록함</Text>
            <View style={[styles.boxCover, styles.gap8]}>
              <CustomButton title='오늘 달성 기록하기' size='M' color='Gray'/>
              <CustomButton title='자세히 보기' size='M' color='Transparent'/>
            </View>
          </View>
          <View style={styles.ContentBox}>
            <Text style={styles.subTitle}>내 포인트</Text>
            <View style={styles.boxCover}>
              <PercentCircle size={20} color={'#000'} />
              <Text style={styles.normalText}>내 포인트</Text>
            </View>
            <View style={styles.line} />
            <CardList title='만다라트 테마' onPress={() => { }} />
          </View>
          <View style={styles.ContentBox}>
            <CardList title='비밀번호 변경' onPress={() => { }} />
            <CardList title='로그아웃' onPress={() => { }} />
            <CardList title='계정 삭제' onPress={() => { }} />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

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
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "700"
  },
  normalText: {
    fontSize: 14,
    fontWeight: "500"
  },
  grayText: {
    fontSize: 16,
    fontWeight: "500",
    color: '#808080'
  },
  contentCover: {
    gap: 12,
    width: Dimensions.get('window').width - 32
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
    objectFit: 'cover'
  },
  gap8: {
    gap: 8,
  },
  boxCover: {
    gap: 4,
    alignItems: 'center',
    width: 'auto',
    flexDirection: 'row'
  },
  recordBox: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginRight: 4
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#E6E6E6',
    width: 'auto',
  }
})
