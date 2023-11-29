import { getDetailMandalArt, getMandalArt } from '@/apis/target';
import ViewAll from '@/components/ViewAll';
import Category from '@/components/common/Category';
import CustomButton from '@/components/common/CustomButton';
import CustomModal from '@/components/common/CustomModal';
import MandalArt from '@/components/common/MandalArt/MandalArt';
import TouchableMandalArt from '@/components/common/MandalArt/TouchableMandalArt';
import TitleBar from '@/components/common/TitleBar';
import { platte } from '@/styles/platte';
import { setItem } from '@/utils/AsyncStorage';
import { RootStackParam } from '@/utils/RootStackParam';
import ThemeSelector from '@/utils/ThemeSelector';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Users } from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';


const DemoData = {
  title: '관광통역안내사 탈환',
  data: ['공부하기', '매일 기록하기', '내일 기록하기', '아 오늘만쉬기'],
  isGroup: true,
  isGroupOwner: true,
  numberOfPeople: 18,
  maxNumberOfPeople: 99999,
  board: [
    { nickname: '주영재', content: '여기는 주영재가 정복한다 모든 주권은 나에게 있고 어쩌고', date: '2022-11-15' },
    { nickname: '펄쓴', content: '이제 공지 누가해주냐', date: '2021-09-20' },
    { nickname: '망고푸딩', content: '백덤블링', date: '1998-02-12' },
  ],
  groupInfo: {
    title: '관통역안내사 취득',
    descripton: '저는 설명이에요',
    tags: ['아트', '예술', 'YaeSul'],
  },
};

export default function GoalDetailScreen({ route }: { route: any }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [detailMandalData, setDetailMandalData] = useState<GetDetailMandalArtResponse[]>(Array.from({ length: 8 }, () => {
    return {
      id: 0,
      content: '',
      is_achieved: false,
      detail_target_responses: Array.from({ length: 8 }, () => {
        return {
          id: 0,
          content: '',
          is_achieved: false
        }
      })
    }
    }))
  const [mandalData, setMandalData] = useState<GetMandalArtResponse>({
    id: 0,
    content: '',
    cycle_count: 0,
    cycle_term: 0,
    cycle_date: '',
    is_achieved: false,
    theme: 'Gray',
    sub_target_response_list: Array.from({ length: 8 }, () => {
      return {
        id: 0,
        content: '',
        is_achieved: false
      }
    })
  })
  const [modalState, setModalState] = useState<string>('');
  const [idList, setIdList] = useState<number[]>([0, 0]);
  const [detailMandalNumber, setDetailMandalNumber] = useState<number>(0)

  const openDetailMandal = (index: number) => {
    setModalState('DetailMandal');
    setDetailMandalNumber(index);
  }

  const completeMandalArt = async () => {
    await setItem('completeMandalData', JSON.stringify([mandalData, detailMandalData]));
    navigation.navigate('Goal', { screen: 'GoalCompleteCheck' });
  }

  useEffect(() => {
    setIdList([route.params.id, route.params.meet_id]);
  }, [route]);

  useEffect(() => {
    if(idList[1] === null) {
      getMandalArt({ targetId: idList[0] })
        .then((res) => {
          setMandalData(res.data);
          for(let i = 0; i < 8; i++) {
            const data = res.data.sub_target_response_list[i];
            if(data.content) {
              getDetailMandalArt({ targetId: data.id }).then((res) => {
                setDetailMandalData(data => [...data.slice(0, i), res.data, ...data.slice(i + 1)]);
              })
              .catch((err) => console.log(err));
            }
          }
        })
        .catch((err) => console.log(err));
    } else {

    }
  }, [idList]);

  if (idList[1] !== null) {
    return (
      <SafeAreaView style={{ paddingVertical: 16 }}>
        <TitleBar title={mandalData.content} onPress={() => navigation.goBack()} />
        <View style={Styles.mainContainer}>
          <TouchableMandalArt title={mandalData.content} data={mandalData.sub_target_response_list.map((value) => value.content)} theme={ThemeSelector(mandalData.theme)} onTouchFn={openDetailMandal}/>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignContent: 'center' }}>
            <Users size={20} color={platte.gray80} />
            <Text style={{ color: platte.gray80 }}>
              {DemoData.numberOfPeople}명이 함께하는 중{' '}
              {DemoData.maxNumberOfPeople < 99999 && `(최대 ${DemoData.maxNumberOfPeople}명 중)`}
            </Text>
          </View>
          <ViewAll title="게시판" onPress={() => navigation.navigate('Goal', { screen: 'GoalGroupBoard' })}>
            {DemoData.board.map((d) => (
              <Comment {...d} key={d.nickname + d.content} />
            ))}
          </ViewAll>
          <CustomButton title="목표 달성 기록" />
          <CustomButton title="모임 관리" color="Gray" onPress={() => setModalState('ManageGroup')} />
        </View>
        <ManageGroupModal
          groupInfo={DemoData.groupInfo}
          setState={setModalState}
          state={modalState}
          isGroupOwner={DemoData.isGroupOwner}
        />
        <ExitGroupModal setState={setModalState} state={modalState} />
        <DeleteGroup setState={setModalState} state={modalState} />
        <DetailMandalArt setState={setModalState} state={modalState} theme={mandalData.theme} data={detailMandalData[detailMandalNumber]}/>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ paddingVertical: 16 }}>
        <TitleBar title={mandalData.content} onPress={() => navigation.goBack()} />
        <View style={{ display: 'flex', paddingHorizontal: 16, gap: 16 }}>
          <TouchableMandalArt title={mandalData.content} data={mandalData.sub_target_response_list.map((value) => value.content)} theme={ThemeSelector(mandalData.theme)} onTouchFn={openDetailMandal}/>
          <CustomButton title="목표 달성 기록" onPress={completeMandalArt} />
          <CustomButton title="목표 편집" color="Gray" />
        </View>
        <DetailMandalArt setState={setModalState} state={modalState} theme={mandalData.theme} data={detailMandalData[detailMandalNumber]}/>
      </SafeAreaView>
    );
  }
}

interface commentType {
  nickname: string;
  content: string;
  date: string;
}

function Comment({ nickname, content, date }: commentType) {
  return (
    <View style={Styles.boardCommentContainer}>
      <Image source={require('@/../assets/icon.png')} style={Styles.boardProfileImage} />
      <Text style={Styles.boardSub}>{nickname}</Text>
      <Text style={Styles.boardContent}>{content}</Text>
      <Text style={Styles.boardSub}>{date}</Text>
    </View>
  );
}

interface ModalType {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

interface ManageGroupModalType extends ModalType {
  groupInfo: {
    title: string;
    descripton: string;
    tags: string[];
  };
  isGroupOwner: boolean;
}

function ManageGroupModal({ state, setState, groupInfo, isGroupOwner }: ManageGroupModalType) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  function nav(v: 'GoalGroupBoard' | 'GoalDetail' | 'GoalJoinRequest') {
    navigation.navigate('Goal', { screen: v });
    setState('');
  }

  if (isGroupOwner) {
    return (
      <CustomModal IsOpen={state === 'ManageGroup'} setIsOpen={() => setState('')}>
        <Text style={{ fontSize: 28, fontFamily: '700' }}>{groupInfo.title}</Text>
        <Text style={{ fontSize: 16 }}>{groupInfo.descripton}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          {groupInfo.tags.map((d) => (
            <Category text={d} key={d + d} />
          ))}
        </View>
        <CustomButton
          title="참가 신청 목록"
          onPress={() => {
            navigation.navigate('Goal', { screen: 'GoalJoinRequest' });
          }}
        />
        <CustomButton
          title="모임 수정"
          onPress={() => {
            navigation.navigate('Group', { screen: 'CreateGroup' });
            setState('');
          }}
        />
        <CustomButton title="모임 삭제" onPress={() => setState('DeleteGroup')} />
        <CustomButton title="즐겨찾기에 추가" />
      </CustomModal>
    );
  } else {
    return (
      <CustomModal IsOpen={state === 'ManageGroup'} setIsOpen={() => setState('')}>
        <Text style={{ fontSize: 28, fontFamily: '700' }}>{groupInfo.title}</Text>
        <Text style={{ fontSize: 16 }}>{groupInfo.descripton}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          {groupInfo.tags.map((d) => (
            <Category text={d} key={d + d} />
          ))}
        </View>
        <CustomButton title="즐겨찾기에 추가" />
        <CustomButton title="모임 나가기" onPress={() => setState('ExitGroup')} />
      </CustomModal>
    );
  }
}


function ExitGroupModal({ state, setState }: ModalType) {
  return (
    <CustomModal IsOpen={state === 'ExitGroup'} setIsOpen={() => setState('')}>
      <Text style={{ fontSize: 28, fontFamily: '700' }}>모임에서 나갈까요?</Text>
      <CustomButton title="나가기" />
    </CustomModal>
  );
}

function DeleteGroup({ state, setState }: ModalType) {
  return (
    <CustomModal IsOpen={state === 'DeleteGroup'} setIsOpen={() => setState('')}>
      <Text style={{ fontSize: 28, fontFamily: '700' }}>모임을 정말 삭제할까요?</Text>
      <Text style={{ fontSize: 16 }}>참가한 인원, 게시판 글, 만든 목표는 되돌릴 수 없어요</Text>
      <CustomButton title="삭제" />
    </CustomModal>
  );
}

interface MandalArtModalType extends ModalType {
  theme: string;
  data: GetDetailMandalArtResponse;
}

const DetailMandalArt = ({ state, setState, theme, data }: MandalArtModalType) => {
  return (
    <CustomModal IsOpen={state === 'DetailMandal'} setIsOpen={() => setState('')}>
      <MandalArt title={data.content} data={data.detail_target_responses.map(value => value.content)} theme={ThemeSelector(theme)} />
    </CustomModal>
  );
}

const Styles = StyleSheet.create({
  boardSub: {
    fontSize: 14,
    color: platte.gray50,
  },
  boardContent: {
    fontSize: 14,
    flex: 1,
  },
  boardProfileImage: {
    width: 24,
    height: 24,
    borderRadius: 880,
  },
  boardCommentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mainContainer: {
    display: 'flex',
    paddingHorizontal: 16,
    gap: 16,
  },
});
