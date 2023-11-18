import CustomButton from "@/components/common/CustomButton";
import CustomModal from "@/components/common/CustomModal";
import TitleBar from "@/components/common/TitleBar";
import { platte } from "@/styles/platte";
import { RootStackParam } from "@/utils/RootStackParam";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";

const DemoData = [
  {
      "nickname": "닝네잉",
      "user_id": 6
  },
  {
      "nickname": "주영재",
      "user_id": 5
  },
  {
      "nickname": "닉's 네임 이즈 닉",
      "user_id": 45
  },
  {
      "nickname": "잉에잉",
      "user_id": 43
  },
  {
      "nickname": "강화도강화",
      "user_id": 408
  },
]

export default function GoalJoinRequest(){
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [modalState, setModalState] = useState<string>('')
  
  return(
    <>
      <SafeAreaView style={{ paddingVertical: 16 }}>
        <TitleBar title="참가 신청 목록" onPress={()=>navigation.goBack()}/>
        <FlatList 
          data={DemoData}
          renderItem={(d)=>
            <Profile setState={setModalState} data={d.item}/>
          }
          keyExtractor={(d)=>`${d.user_id}`}
          contentContainerStyle={{marginHorizontal: 16, gap: 8}}
        />
      </SafeAreaView>
      <RequestConfirm setState={setModalState} state={modalState}/>
    </>
  )
}

interface ProfilePropsType{
  setState: React.Dispatch<React.SetStateAction<string>>;
  data:{
    nickname: string;
    user_id: number;
  }
}

function Profile({ setState, data }:ProfilePropsType){
  return(
    <View style={Style.profileContainer}>
      <Image source={require('@/../assets/icon.png')} style={Style.profilePhoto}/>
      <Text style={{fontSize: 16, flex: 1}}>{data.nickname}</Text>
      <CustomButton size="S" color="Gray" title="거절" onPress={()=> setState('decline')}/>
      <CustomButton size="S" title="수락" onPress={()=> setState('accept')}/>
    </View>
  )
}

interface RequestConfirmType{
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}
function RequestConfirm({state, setState}:RequestConfirmType){
  return(
    <CustomModal IsOpen={state !== ""} setIsOpen={()=>setState('')}>
      <Text style={{fontSize: 28, fontWeight: '700'}}>{state === 'decline' ? '참가 신청을 거절할까요?' : '참가 신청을 수락할까요?'}</Text>
      <CustomButton title={state === 'decline' ? '거절' : '수락'}/>
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