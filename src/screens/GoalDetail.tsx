import ViewAll from "@/components/ViewAll";
import Category from "@/components/common/Category";
import CustomButton from "@/components/common/CustomButton";
import CustomModal from "@/components/common/CustomModal";
import MandalArt from "@/components/common/MandalArt/MandalArt";
import { PurpleTheme } from "@/components/common/MandalArt/theme";
import TitleBar from "@/components/common/TitleBar";
import { platte } from "@/styles/platte";
import { RootStackParam } from "@/utils/RootStackParam";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Users } from "lucide-react-native";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

const DemoData = {
  title: '관광통역안내사 탈환',
  data: ['공부하기', '매일 기록하기', '내일 기록하기', '아 오늘만쉬기'],
  isGroup: true,
  isGroupOwner: false,
  numberOfPeople: 18,
  maxNumberOfPeople: 99999,
  board:[
    {nickname: '주영재', content: '여기는 주영재가 정복한다 모든 주권은 나에게 있고 어쩌고', date: '2022-11-15'},
    {nickname: '펄쓴', content: '이제 공지 누가해주냐', date:'2021-09-20'},
    {nickname: '망고푸딩', content: '백덤블링', date: '1998-02-12'},
  ],
  groupInfo:{
    title: '관통역안내사 취득',
    descripton: '저는 설명이에요',
    tags: ['아트', '예술', 'YaeSul']
  }
}

export default function GoalDetailScreen(){
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [modalState, setModalState] = useState<string>('');

  if(DemoData.isGroup){
    return(
      <SafeAreaView style={{ paddingVertical: 16 }}>
        <TitleBar title="관광통역안내사 탈취" onPress={()=>navigation.goBack()}/>
        <View style={Styles.mainContainer}>
          <MandalArt title={DemoData.title} data={DemoData.data} theme={PurpleTheme}/>
          <View style={{display: 'flex', flexDirection: 'row', gap: 4, alignContent: 'center'}}>
            <Users size={20} color={platte.gray80}/>
            <Text style={{color: platte.gray80}}>{DemoData.numberOfPeople}명이 함께하는 중 {DemoData.maxNumberOfPeople<99999 && `(최대 ${DemoData.maxNumberOfPeople}명 중)`}</Text>
          </View>
          <ViewAll title="게시판" onPress={()=> navigation.navigate('Goal', { screen: 'GoalGroupBoard' })}>
            {DemoData.board.map((d)=>
              <Comment {...d} key={d.nickname+d.content}/>
            )}
          </ViewAll>
          <CustomButton title="목표 달성 기록"/>
          <CustomButton title="모임 관리" color="Gray" onPress={()=>setModalState("ManageGroup")}/>
        </View>
        <ManageGroupModal groupInfo={DemoData.groupInfo} setState={setModalState} state={modalState}/>
      </SafeAreaView>
    )
  }
  else{
    return(
      <SafeAreaView style={{ paddingVertical: 16 }}>
        <TitleBar title="관광통역안내사 탈취" onPress={()=>navigation.goBack()}/>
        <View style={{display: 'flex', paddingHorizontal: 16, gap: 16}}>
          <MandalArt title={DemoData.title} data={DemoData.data} theme={PurpleTheme}/>
          <CustomButton title="목표 달성 기록"/>
          <CustomButton title="목표 편집" color="Transparent"/>
        </View>
      </SafeAreaView>
    )
  }
}

interface commentType{
  nickname: string;
  content: string;
  date: string;
}

function Comment({nickname, content, date}:commentType){
  return(
    <View style={Styles.boardCommentContainer}>
      <Image source={require('@/../assets/icon.png')} style={Styles.boardProfileImage}/>
      <Text style={Styles.boardSub}>{nickname}</Text>
      <Text style={Styles.boardContent}>{content}</Text>
      <Text style={Styles.boardSub}>{date}</Text>
    </View>
  )
}

interface ManageGroupModalType{
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  groupInfo: {
    title: string;
    descripton: string;
    tags: string[];
  };
}
function ManageGroupModal({state, setState, groupInfo}:ManageGroupModalType){
  return(
    <CustomModal IsOpen={state==='ManageGroup'} setIsOpen={()=>setState('')}>
      <Text style={{fontSize: 28, fontWeight: '700'}}>{groupInfo.title}</Text>
      <Text style={{fontSize: 16}}>{groupInfo.descripton}</Text>
      <View style={{display: "flex", flexDirection: 'row', gap: 8}}>
        {groupInfo.tags.map((d)=>
          <Category text={d} key={d+d}/>
        )}
      </View>
      <CustomButton title="즐겨찾기에 추가"/>
      <CustomButton title="모임 나가기"/>
    </CustomModal>
  )
}

const Styles = StyleSheet.create({
  boardSub:{
    fontSize: 14,
    color: platte.gray50,
  },
  boardContent:{
    fontSize: 14,
    flex: 1,
  },
  boardProfileImage:{
    width: 24,
    height: 24,
    borderRadius: 880,
  },
  boardCommentContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mainContainer:{
    display: 'flex',
    paddingHorizontal: 16,
    gap: 16
  },
})