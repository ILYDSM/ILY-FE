import { viewDetailBoard } from '@/apis/board';
import { createBookMark } from '@/apis/bookmark';
import { deleteGroup, exitGroup, viewDetailGroup } from '@/apis/meet';
import { getDetailMandalArt, getMandalArt, getMeetMandalArt } from '@/apis/target';
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
  const [boardData, setBoardData] = useState<viewDetailBoardResponse[]>([])
  const [meetData, setMeedData] = useState<ViewDetailResponse>();

  const openDetailMandal = (index: number) => {
    setModalState('DetailMandal');
    setDetailMandalNumber(index);
  }

  const completeMandalArt = async () => {
    await setItem('completeMandalData', JSON.stringify([mandalData, detailMandalData]));
    navigation.navigate('Goal', { screen: 'GoalCompleteCheck' });
  }

  const onMandalEdit = async () => {
    await setItem('mandalType', 'edit');
    await setItem('mandalId', mandalData.id.toString());
    await setItem('mandalArtCreate', JSON.stringify([mandalData.content, ...mandalData.sub_target_response_list.map((value) => value.content), ...detailMandalData.map((data) => data.detail_target_responses.map((value) => value.content)).flat()]));
    await setItem('mandalTheme', mandalData.theme)
    await setItem('mandalCycle', mandalData.cycle_term.toString());
    await setItem('MandalInfo', JSON.stringify([mandalData.cycle_count, mandalData.cycle_date]));
    navigation.navigate('Goal', { screen: 'GoalCreateMain' });
  }

  const onExit = () => {
    exitGroup(idList[1].toString())
    .then(() => navigation.reset({ routes: [{ name: 'Main' }]}))
    .catch((err) => console.log('모임을 나갈 수 없음:\n', err));
  }

  const onDelete = () => {
    deleteGroup(idList[1].toString())
    .then(() => navigation.reset({ routes: [{ name: 'Main' }]}))
    .catch((err) => console.log('모임을 나갈 수 없음:\n', err));
  }

  const onEditGroup = async () => {
    await setItem('groupType', 'edit');
    await setItem('groupData', JSON.stringify(meetData));
    navigation.navigate('Group', { screen: 'CreateGroup' });
    setModalState('');
  }

  const onCreateBookMark = async () => {
    await createBookMark(idList[1].toString());
    setModalState('')
  }

  useEffect(() => {
    setIdList([route.params.id, route.params.meet_id]);
  }, [route]);

  useEffect(() => {
    if (idList[1] === null) {
      getMandalArt({ targetId: idList[0] })
        .then((res) => {
          setMandalData(res.data);
          for (let i = 0; i < 8; i++) {
            const data = res.data.sub_target_response_list[i];
            if (data.content) {
              getDetailMandalArt({ targetId: data.id }).then((res) => {
                setDetailMandalData(data => [...data.slice(0, i), res.data, ...data.slice(i + 1)]);
              })
                .catch((err) => console.log(err));
            }
          }
        })
        .catch((err) => console.log('만다라트를 불러올 수 없음\n', err));
    } else {
      getMeetMandalArt({ targetId: idList[1] })
        .then((res) => {
          setMandalData(res.data);
          for (let i = 0; i < 8; i++) {
            const data = res.data.sub_target_response_list[i];
            if (data.content) {
              getDetailMandalArt({ targetId: data.id }).then((res) => {
                setDetailMandalData(data => [...data.slice(0, i), res.data, ...data.slice(i + 1)]);
              })
                .catch((err) => console.log(err));
            }
          }
        })
        .catch((err) => console.log('모임 만다라트를 불러올 수 없음:\n', err));
      viewDetailGroup(idList[1].toString()).then((res) => {
        setMeedData(res.data);
      })
        .catch((err) => console.log('모임 정보을 불러올 수 없음\n', err));
      viewDetailBoard(idList[1].toString()).then((res) => {
        setBoardData(res.data);
      })
        .catch((err) => console.log('모임 게시판을 불러올 수 없음\n', err));
    }
  }, [idList]);

  if (meetData) {
    return (
      <SafeAreaView style={{ paddingVertical: 16 }}>
        <TitleBar title={mandalData.content} onPress={() => navigation.goBack()} />
        <View style={Styles.mainContainer}>
          <TouchableMandalArt title={mandalData.content} data={mandalData.sub_target_response_list.map((value) => value.content)} theme={ThemeSelector(mandalData.theme)} onTouchFn={openDetailMandal} />
          <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignContent: 'center' }}>
            <Users size={20} color={platte.gray80} />
            <Text style={{ color: platte.gray80 }}>
              {meetData.user_count}명이 함께하는 중{' '}
              {Number(meetData.personnel) < 99999 && `(최대 ${meetData.personnel}명 중)`}
            </Text>
          </View>
          <ViewAll title="게시판" onPress={() => navigation.navigate('Goal', { screen: 'GoalGroupBoard' })}>
            {boardData.slice(0, 3).map((d) => (
              <Comment {...d} key={d.writerName + d.content} />
            ))}
          </ViewAll>
          <CustomButton title="목표 달성 기록" onPress={completeMandalArt} />
          <CustomButton title="모임 관리" color="Gray" onPress={() => setModalState('ManageGroup')} />
        </View>
        <ManageGroupModal
          groupInfo={{
            title: meetData.title,
            descripton: meetData.explain,
            tags: meetData.division,
          }}
          setState={setModalState}
          state={modalState}
          isGroupOwner={DemoData.isGroupOwner}
          onEditMandal={onMandalEdit}
          onEditGroup={onEditGroup}
          onCreateBookMark={onCreateBookMark}
        />
        <ExitGroupModal setState={setModalState} state={modalState} onExit={onExit}/>
        <DeleteGroup setState={setModalState} state={modalState} onDelete={onDelete}/>
        <DetailMandalArt setState={setModalState} state={modalState} theme={mandalData.theme} data={detailMandalData[detailMandalNumber]} />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ paddingVertical: 16 }}>
        <TitleBar title={mandalData.content} onPress={() => navigation.goBack()} />
        <View style={{ display: 'flex', paddingHorizontal: 16, gap: 16 }}>
          <TouchableMandalArt title={mandalData.content} data={mandalData.sub_target_response_list.map((value) => value.content)} theme={ThemeSelector(mandalData.theme)} onTouchFn={openDetailMandal} />
          <CustomButton title="목표 달성 기록" onPress={completeMandalArt} />
          <CustomButton title="목표 편집" color="Gray" onPress={onMandalEdit} />
        </View>
        <DetailMandalArt setState={setModalState} state={modalState} theme={mandalData.theme} data={detailMandalData[detailMandalNumber]} />
      </SafeAreaView>
    );
  }
}

interface commentType {
  writerName: string;
  content: string;
  createDate: string;
}

function Comment({ writerName, content, createDate }: commentType) {
  const date = () => {
    const today = new Date();
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const writeDate = new Date(createDate);
    if (today.getTime() === writeDate.getTime()) {
      return '오늘';
    }
    else if (yesterday.getTime() === writeDate.getTime()) {
      return '어제';
    }
    else if (today.getFullYear() !== writeDate.getFullYear()) {
      return `${today.getFullYear}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    }
    return `${today.getMonth() + 1}월 ${today.getDate()}일`;
  }

  return (
    <View style={Styles.boardCommentContainer}>
      <Image source={require('@/../assets/icon.png')} style={Styles.boardProfileImage} />
      <Text style={Styles.boardSub}>{writerName}</Text>
      <Text style={Styles.boardContent}>{content}</Text>
      <Text style={Styles.boardSub}>{date()}</Text>
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
  onEditMandal: () => void;
  onEditGroup: () => void;
  onCreateBookMark: () => void;
}

function ManageGroupModal({ state, setState, groupInfo, isGroupOwner, onEditMandal, onEditGroup, onCreateBookMark }: ManageGroupModalType) {
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
        <CustomButton title="목표 수정" onPress={onEditMandal} />
        <CustomButton title="모임 수정" onPress={onEditGroup} />
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
        <CustomButton title="즐겨찾기에 추가" onPress={onCreateBookMark}/>
        <CustomButton title="모임 나가기" onPress={() => setState('ExitGroup')} />
      </CustomModal>
    );
  }
}

interface ExitGroupModalType extends ModalType {
  onExit: () => void;
}

function ExitGroupModal({ state, setState, onExit }: ExitGroupModalType) {
  return (
    <CustomModal IsOpen={state === 'ExitGroup'} setIsOpen={() => setState('')}>
      <Text style={{ fontSize: 28, fontFamily: '700' }}>모임에서 나갈까요?</Text>
      <CustomButton title="나가기" onPress={onExit}/>
    </CustomModal>
  );
}

interface DeleteGroupType extends ModalType {
  onDelete: () => void;
}

function DeleteGroup({ state, setState, onDelete }: DeleteGroupType) {
  return (
    <CustomModal IsOpen={state === 'DeleteGroup'} setIsOpen={() => setState('')}>
      <Text style={{ fontSize: 28, fontFamily: '700' }}>모임을 정말 삭제할까요?</Text>
      <Text style={{ fontSize: 16 }}>참가한 인원, 게시판 글, 만든 목표는 되돌릴 수 없어요</Text>
      <CustomButton title="삭제" onPress={onDelete}/>
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
