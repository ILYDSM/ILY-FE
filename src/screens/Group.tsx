import { applyGroup } from '@/apis/applicant';
import { viewAllGroup, viewDetailGroup } from '@/apis/meet';
import { viewReview } from '@/apis/review';
import PageTitle from '@/components/PageTitle';
import { ReviewComponent } from '@/components/ReviewComponent';
import Category from '@/components/common/Category';
import CustomButton from '@/components/common/CustomButton';
import CustomInput from '@/components/common/CustomInput';
import CustomModal from '@/components/common/CustomModal';
import MandalArt from '@/components/common/MandalArt/MandalArt';
import Margin from '@/components/common/Margin';
import MeetCard from '@/components/common/MeetCard';
import { platte } from '@/styles/platte';
import { getItem, removeItem } from '@/utils/AsyncStorage';
import { RootStackParam } from '@/utils/RootStackParam';
import ThemeSelector from '@/utils/ThemeSelector';
import { interestType, interestTypeToKorean } from '@/utils/Translates';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search, Users } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';

const Group = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [result, setResult] = useState<ViewAllResponse[]>([]);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [modalState, setModalState] = useState('');
  const [mandalData, setMandalData] = useState<string[]>([]);
  const [detailNumber, setDetailNumber] = useState<number>(0);
  const [detailData, setDetailData] = useState<ViewDetailResponse>();
  const [reviewList, setReviewList] = useState<GetReviewResponse[]>();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      keyword: '',
    },
  });

  useEffect(() => {
    viewAllGroup()
      .then((res) => {
        setResult(res.data);
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    viewDetailGroup(detailNumber)
      .then((res) => {
        setDetailData(res.data);
      })
      .catch(() => { });
  }, [detailNumber]);

  useEffect(() => {
    viewReview(detailNumber)
      .then((res) => {
        setReviewList(res.data);
      })
      .catch(() => { });
  }, [detailNumber]);

  const onSubmit = (data: any) => {
    navigation.navigate('Group', { screen: 'SearchResult', params: { keyword: data.keyword } });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <PageTitle title="모임" />
        <View style={{ flex: 1, width: '100%', paddingHorizontal: 16, gap: 16 }}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                text="검색"
                placeholder="모임찾기"
                icon={
                  <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                    <Search size={20} color={platte.gray50} />
                  </TouchableOpacity>
                }
                onChangeText={onChange}
                value={value}
              />
            )}
            name="keyword"
          />
          <CustomButton
            title="관심사별 보기"
            size="M"
            color="Gray"
            onPress={() => navigation.navigate('Group', { screen: 'GroupCategory' })}
          />
          <CustomButton
            title="+ 새 모임 만들기"
            size="M"
            color="Black"
            onPress={async () => {
              const type = await getItem('groupType');
              const dataJSON = await getItem('groupData');
              if (type) removeItem('groupType');
              if (dataJSON) removeItem('groupData');
              navigation.navigate('Group', { screen: 'CreateGroup' });
            }}
          />
          <Text style={styles.recommendText}>추천 모임</Text>
          <FlatList
            data={result}
            renderItem={({ item }) => (
              <>
                <MeetCard
                  title={item.title}
                  description={item.content}
                  headCount={item.participant}
                  onPress={() => {
                    setDetailNumber(item.meet_id);
                    setOpenModal(true);
                    setModalState('GROUP_DETAIL');
                  }}
                />
                <Margin height={16} />
              </>
            )}
            keyExtractor={(item, idx) => item.title + idx}
          />
        </View>
        <CustomModal IsOpen={isOpenModal} setIsOpen={setOpenModal}>
          {modalState === 'GROUP_DETAIL' && (
            <View style={{ gap: 12 }}>
              <Text style={{ fontSize: 26, fontFamily: '700' }}>{mandalData[detailNumber + 1]}</Text>
              <MandalArt
                title={detailData?.title}
                data={detailData?.sub_target_response_list.map((res) => res.content)}
                theme={ThemeSelector(detailData?.theme as string)}
              />
              <Text style={{ fontSize: 16, fontWeight: '500' }}>{detailData?.meet_content}</Text>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  columnGap: 8,
                }}
              >
                {detailData?.type.map((res, idx) => {
                  return <Category key={idx} text={interestTypeToKorean[res]} />;
                })}
              </ScrollView>
              <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                <Users size={20} color={platte.gray50} />
                <Text style={{ fontSize: 14, fontWeight: '500', color: platte.gray80 }}>
                  {detailData?.participant || 0}명이 함께하는 중{' '}
                  {detailData?.personnel && `(최대 ${detailData.personnel}명)`}
                </Text>
              </View>
              <CustomButton title="모임 참가 신청" size="L" color="Black" onPress={() => setModalState('JOIN_GROUP')} />
              <CustomButton
                title="모임 후기 보기"
                size="L"
                color="Gray"
                onPress={() => setModalState('GROUP_REVIEW')}
              />
            </View>
          )}
          {modalState === 'JOIN_GROUP' && (
            <View style={{ gap: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>{detailData?.title}에 참가를 신청할까요?</Text>
              <CustomButton
                title="신청"
                size="L"
                color="Black"
                onPress={() => {
                  applyGroup(detailNumber)
                    .then((res) => {
                      console.log(res.data);
                      setOpenModal(false);
                    })
                    .catch(() => setOpenModal(false));
                }}
              />
            </View>
          )}
          {modalState === 'GROUP_REVIEW' && (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: '700' }}>{detailData?.title} 모임 후기</Text>
              {reviewList?.length == 0 ? (
                reviewList?.map((res) => {
                  return (
                    <ReviewComponent key={res.id} name={res.writer_name} content={res.content} date={res.create_name} />
                  );
                })
              ) : (
                <View
                  style={{ padding: 8, gap: 4, borderRadius: 8, backgroundColor: platte.gray05, alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>리뷰가 없습니다</Text>
                </View>
              )}
            </View>
          )}
        </CustomModal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Group;

const styles = StyleSheet.create({
  recommendText: {
    color: platte.gray100,
    fontSize: 28,
    fontFamily: '700',
  },
});
