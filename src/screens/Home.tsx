import { applyGroup } from '@/apis/applicant';
import { viewAllGroup, viewDetailGroup } from '@/apis/meet';
import { viewReview } from '@/apis/review';
import GoalCard from '@/components/GoalCard';
import PageTitle from '@/components/PageTitle';
import { ReviewComponent } from '@/components/ReviewComponent';
import ViewAll from '@/components/ViewAll';
import Category from '@/components/common/Category';
import CustomButton from '@/components/common/CustomButton';
import CustomModal from '@/components/common/CustomModal';
import GoalCheck from '@/components/common/GoalCheck';
import MandalArt from '@/components/common/MandalArt/MandalArt';
import MeetCard from '@/components/common/MeetCard';
import { platte } from '@/styles/platte';
import { RootStackParam } from '@/utils/RootStackParam';
import ThemeSelector from '@/utils/ThemeSelector';
import { interestTypeToKorean } from '@/utils/Translates';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Users } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [groups, setGroups] = useState<ViewAllResponse[]>([]);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [modalState, setModalState] = useState('');
  const [mandalData, setMandalData] = useState<string[]>([]);
  const [detailNumber, setDetailNumber] = useState<number>(0);
  const [detailData, setDetailData] = useState<ViewDetailResponse>();
  const [reviewList, setReviewList] = useState<GetReviewResponse[]>();

  useEffect(() => {
    viewAllGroup().then((res) => {
      setGroups(res.data.slice(0, 2));
    });
  }, []);

  useEffect(() => {
    viewDetailGroup(detailNumber)
      .then((res) => {
        setDetailData(res.data);
      })
      .catch(() => {});
  }, [detailNumber]);

  useEffect(() => {
    viewReview(detailNumber)
      .then((res) => {
        setReviewList(res.data);
      })
      .catch(() => {});
  }, [detailNumber]);

  return (
    <>
      <ScrollView>
        <PageTitle title="홈" />
        <View style={{ flexDirection: 'column', gap: 12, paddingHorizontal: 16 }}>
          <GoalCheck />
          <ViewAll title="이런 모임도 있어요" onPress={() => navigation.navigate('모임')}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {groups.map((res, idx) => {
                return (
                  <MeetCard
                    key={idx}
                    title={res.title}
                    description={res.content}
                    headCount={res.participant}
                    onPress={() => {
                      setDetailNumber(res.meet_id);
                      setOpenModal(true);
                      setModalState('GROUP_DETAIL');
                    }}
                  />
                );
              })}
            </View>
          </ViewAll>
          <ViewAll title="즐겨찾기한 목표" onPress={() => navigation.navigate('목표')}>
            <FlatList
              style={{ width: '100%', gap: 20 }}
              scrollEnabled={false}
              data={[
                {
                  target: 'asd 취득4',
                  isGroup: false,
                  theme: 'Teal',
                },
              ]}
              renderItem={({ item, index }) => {
                const themeObject = ThemeSelector(item.theme);
                return (
                  <View key={index} style={{ width: '46%', margin: '2%' }}>
                    <GoalCard isGroup={false} text={item.target} theme={themeObject} />
                  </View>
                );
              }}
              numColumns={2}
            />
          </ViewAll>
        </View>
      </ScrollView>
      <CustomModal IsOpen={isOpenModal} setIsOpen={setOpenModal}>
        {modalState === 'GROUP_DETAIL' && (
          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 26, fontFamily: '700' }}>{mandalData[detailNumber + 1]}</Text>
            <MandalArt
              title={detailData?.title}
              data={detailData?.sub_target_response_list.map((res) => res.content)}
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
            <CustomButton title="모임 후기 보기" size="L" color="Gray" onPress={() => setModalState('GROUP_REVIEW')} />
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
    </>
  );
};

export default Home;
