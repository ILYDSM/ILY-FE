import { applyGroup } from '@/apis/applicant';
import { viewCategoryGroup, viewDetailGroup } from '@/apis/meet';
import { viewReview } from '@/apis/review';
import { ReviewComponent } from '@/components/ReviewComponent';
import Category from '@/components/common/Category';
import CustomButton from '@/components/common/CustomButton';
import CustomModal from '@/components/common/CustomModal';
import MandalArt from '@/components/common/MandalArt/MandalArt';
import Margin from '@/components/common/Margin';
import MeetCard from '@/components/common/MeetCard';
import TitleBar from '@/components/common/TitleBar';
import { DATA } from '@/constants/mock';
import { platte } from '@/styles/platte';
import { RootStackParam } from '@/utils/RootStackParam';
import { interestType, interestTypeToKorean } from '@/utils/Translates';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Users } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GroupCategory = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [categories, setCategories] = useState<InterestEnglishType>('Sports');
  const [result, setResult] = useState<ViewAllResponse[]>([]);
  const [detailNumber, setDetailNumber] = useState<number>(0);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [modalState, setModalState] = useState('');
  const [mandalData, setMandalData] = useState<string[]>([]);
  const [detailData, setDetailData] = useState<ViewDetailResponse>();
  const [reviewList, setReviewList] = useState<GetReviewResponse[]>();

  useEffect(() => {
    viewCategoryGroup(categories)
      .then((res) => setResult(res.data))
      .catch((err) => console.log(err));
  }, [categories]);

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
    <SafeAreaView style={{ flex: 1 }}>
      <TitleBar title="분류별로 보기" onPress={() => navigation.goBack()} />
      <View style={{ flex: 1, width: '100%', paddingHorizontal: 16, gap: 20 }}>
        <View>
          <ScrollView
            horizontal
            contentContainerStyle={{
              columnGap: 8,
            }}
          >
            {Object.entries(interestType).map((interest, index) => {
              return (
                <Category
                  key={index}
                  clicked={categories.includes(interest[1])}
                  text={interest[0]}
                  onPress={() => setCategories(interest[1])}
                />
              );
            })}
          </ScrollView>
        </View>
        <FlatList
          data={result}
          renderItem={({ item }) => (
            <>
              <MeetCard
                title={item.title}
                description={item.content}
                headCount={item.participant}
                onPress={() => {
                  setOpenModal(true);
                  setDetailNumber(item.meet_id);
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
              title={mandalData[detailNumber + 1]}
              data={mandalData.slice(9 + detailNumber * 8, 17 + detailNumber * 8)}
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
            {reviewList?.length !== 0 ? (
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
    </SafeAreaView>
  );
};

export default GroupCategory;
