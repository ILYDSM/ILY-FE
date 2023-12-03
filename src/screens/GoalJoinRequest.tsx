import { applicantMeet, approveApplicantMeet } from "@/apis/applicant";
import CustomButton from "@/components/common/CustomButton";
import CustomModal from "@/components/common/CustomModal";
import TitleBar from "@/components/common/TitleBar";
import { platte } from "@/styles/platte";
import { RootStackParam } from "@/utils/RootStackParam";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";

export default function GoalJoinRequest({ route }: { route: any }){
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [meetId, setMeedId] = useState<string>('');
  const [applicantData, setApplicantData] = useState<applicantMeetResponse[]>([]);
  
  const onApprove = async (userID: number, approve: boolean) => {
    await approveApplicantMeet(meetId, userID, approve)
    .then(() => setApplicantData(data => data.filter((value) => value.user_id !== userID)))
    .catch((err) => console.log(`모임 참가 요청을 ${approve ? '수락' : '거절'}을 할 수 없음:\n`, err))
  }

  useEffect(() => {
    setMeedId(route.params.meet_id?.toString());
  }, [route]);

  useEffect(() => {
    applicantMeet(meetId).then((res) => {
      setApplicantData(res.data);
    })
      .catch((err) => console.log('모임 게시판을 불러올 수 없음\n', err));
  }, [])

  return(
    <SafeAreaView style={{ paddingVertical: 16 }}>
      <TitleBar title="참가 신청 목록" onPress={()=>navigation.goBack()}/>
      <FlatList 
        data={applicantData}
        extraData={applicantData}
        renderItem={(d)=>
          <Profile data={d.item} onApprove={onApprove} />
        }
        keyExtractor={(d)=>`${d.user_id}`}
        contentContainerStyle={{marginHorizontal: 16, gap: 8}}
        />
    </SafeAreaView>
  )
}

interface ProfilePropsType{
  data:{
    nickname: string;
    user_id: number;
  }
  onApprove: (userID: number, approve: boolean) => void;
}

function Profile({ data, onApprove }:ProfilePropsType){
  const [modalState, setModalState] = useState<string>('');
  return(
    <>
      <View style={Style.profileContainer}>
        <Image source={require('@/../assets/icon.png')} style={Style.profilePhoto}/>
        <Text style={{fontSize: 16, flex: 1}}>{data.nickname}</Text>
        <CustomButton size="S" color="Gray" title="거절" onPress={()=> setModalState('decline')}/>
        <CustomButton size="S" title="수락" onPress={()=> setModalState('accept')}/>
      </View>
      <RequestConfirm setState={setModalState} state={modalState} name={data.nickname} onApprove={(approve) => onApprove(data.user_id, approve)}/>
    </>
  )
}

interface RequestConfirmType{
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  onApprove: (approve: boolean) => void;
}
function RequestConfirm({state, setState, name, onApprove}:RequestConfirmType){
  return(
    <CustomModal IsOpen={state !== ""} setIsOpen={()=>setState('')}>
      <Text style={{fontSize: 28, fontFamily: '700'}}>'{name}'의 참가 신청을 {state === 'decline' ? '거절할까요?' : '수락할까요?'}</Text>
      <CustomButton title={state === 'decline' ? '거절' : '수락'} onPress={() => onApprove(state !== 'decline')}/>
    </CustomModal>
  )
}

const Style = StyleSheet.create({
  profileContainer:{
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    padding: 8,
    gap: 4, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: platte.gray10,
    borderStyle: "dotted",
  },
  profilePhoto:{
    borderRadius: 99,
    width: 32,
    height: 32,
  },
})