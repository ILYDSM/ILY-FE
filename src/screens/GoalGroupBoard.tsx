import { createBoard, detailBoard, editBoard, viewDetailBoard } from "@/apis/board";
import CustomButton from "@/components/common/CustomButton";
import CustomInput from "@/components/common/CustomInput";
import CustomModal from "@/components/common/CustomModal";
import TitleBar from "@/components/common/TitleBar";
import { platte } from "@/styles/platte";
import { RootStackParam } from "@/utils/RootStackParam";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function GoalGroupBoard({ route }: { route: any }){
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [commentValue, setCommentValue] = useState<string>('')
  const [meetId, setMeedId] = useState<string>('');
  const [boardData, setBoardData] = useState<viewDetailBoardResponse[]>([])

  const onEdit = async (content: string) => {
    await editBoard({ content }, meetId);
    navigation.reset({ routes: [{ name: 'Main' }]});
  }

  const onDelete = async () => {
    await detailBoard(meetId);
    navigation.reset({ routes: [{ name: 'Main' }]});
  }

  const onComment = async () => {
    await createBoard({ content: commentValue }, meetId)
    .then(() => getBoard());
  }

  const getBoard = async () => {
    await viewDetailBoard(meetId).then((res) => {
      setBoardData(res.data);
    })
      .catch((err) => console.log('모임 게시판을 불러올 수 없음\n', err));
  }

  useEffect(() => {
    setMeedId(route.params.meet_id?.toString());
  }, [route]);

  useEffect(() => {
    getBoard();
  }, [])

  return(
    <SafeAreaView style={{paddingVertical: 16, flex: 1}}>
      <TitleBar title="게시판" onPress={()=>navigation.goBack()}/>
      <View style={{flex: 1, paddingHorizontal: 16}}>
        <FlatList
          data={boardData}
          extraData={boardData}
          renderItem={(d)=><Article content={d.item.content} date={d.item.createDate} nickname={d.item.writerName} onEdit={onEdit} onDelete={onDelete}/>}
          keyExtractor={(d)=> `${d.createDate+d.writerName}`}
          contentContainerStyle={{gap: 8}}
        />
      </View>
      <View style={Style.inputContainer}>
        <View style={{flex: 1}}>
          <CustomInput text="댓글" value={commentValue} onChangeText={setCommentValue}/>
        </View>
        <CustomButton title="작성" size="M" onPress={onComment}/>
      </View>
    </SafeAreaView>
  )
}

interface ArticleType{
  content: string;
  nickname: string;
  date: string;
  onEdit: (content: string) => void;
  onDelete: () => void;
}

function Article({ content, date, nickname, onEdit, onDelete }:ArticleType){
  const [modalState, setModalState] = useState<string>('');

  return(
    <>
      <ArticleModal setState={setModalState} state={modalState}/>
      <ArticleDeleteModal setState={setModalState} state={modalState} onDelete={onDelete}/>
      <ArticleEditModal setState={setModalState} state={modalState} content={content} onEdit={onEdit}/>
      <TouchableOpacity onPress={()=>setModalState('menu')} style={Style.articleContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <Image style={{height: 24, width:24, borderRadius:88}} source={require('@/../assets/ilyLogo.png')}/>
          <Text style={{fontSize: 14, }}>{nickname}</Text>
        </View>
        <Text style={{fontSize: 16}}>{content}</Text>
        <Text style={{fontSize: 12, color: platte.gray50}}>{date}</Text>
      </TouchableOpacity>
    </>
  )
}

interface ArticleModalType{
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  content?: string
  onEdit?: (content: string) => void;
  onDelete?: () => void;
}

function ArticleModal({setState, state}:ArticleModalType){
  return(
    <CustomModal IsOpen={state==='menu'} setIsOpen={()=>setState('')}>
      <CustomButton title="수정" onPress={()=>setState('edit')}/>
      <CustomButton title="삭제" onPress={()=>setState('delete')}/>
    </CustomModal>
  )
}

function ArticleEditModal({ setState, state, content, onEdit = () => {} }:ArticleModalType){
  const [article, setArticle] = useState<string>(content ?? '');

  return(
    <CustomModal IsOpen={state==='edit'} setIsOpen={()=>setState('')}>
      <CustomInput text="내용" defaultValue={content} onChangeText={(d)=>setArticle(d)}/>
      <CustomButton title="수정" onPress={() => onEdit(article)} />
    </CustomModal>
  )
}

function ArticleDeleteModal({ setState, state, onDelete = () => {} }:ArticleModalType){
  return(
    <CustomModal IsOpen={state==='delete'} setIsOpen={()=>setState('')}>
      <Text style={{fontFamily: '700', fontSize: 28}}>게시물을 삭제할까요?</Text>
      <CustomButton title="삭제" onPress={onDelete} />
    </CustomModal>
  )
}

const Style = StyleSheet.create({
  inputContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16
  },
  articleContainer:{
    padding: 8,
    borderRadius: 8,
    backgroundColor: platte.gray05,
    gap: 8,
  },
})