import CustomButton from "@/components/common/CustomButton";
import CustomInput from "@/components/common/CustomInput";
import TitleBar from "@/components/common/TitleBar";
import { platte } from "@/styles/platte";
import { RootStackParam } from "@/utils/RootStackParam";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image } from "react-native";

const DemoData = [
	{
		"content":"이제 공지 누가해주냐",
		"create_name":"2022-03-20",
		"writer_name":"NeckName"
	},
	{
		"content":"내용",
		"create_name":"2022-03-20",
		"writer_name":"작성자"
	}
]

export default function GoalGroupBoard(){
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [commentValue, setCommentValue] = useState<string>('')

  return(
    <SafeAreaView style={{paddingVertical: 16, flex: 1}}>
      <TitleBar title="게시판" onPress={()=>navigation.goBack()}/>
      <View style={{flex: 1, paddingHorizontal: 16}}>
        <FlatList
          data={DemoData}
          renderItem={(d)=><Article content={d.item.content} date={d.item.create_name} nickname={d.item.writer_name}/>}
          keyExtractor={(d)=> `${d.create_name+d.writer_name}`}
          contentContainerStyle={{gap: 8}}
        />
      </View>
      <View style={Style.inputContainer}>
        <View style={{flex: 1}}>
          <CustomInput text="댓글" value={commentValue} onChangeText={setCommentValue}/>
        </View>
        <CustomButton title="작성" size="M"/>
      </View>
    </SafeAreaView>
  )
}

interface ArticleType{
  content: string;
  nickname: string;
  date: string;
}

function Article({ content, date, nickname }:ArticleType){
  return(
    <View style={Style.articleContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
        <Image style={{height: 24, width:24, borderRadius:88}} source={require('@/../assets/ilyLogo.png')}/>
        <Text style={{fontSize: 14, }}>{nickname}</Text>
      </View>
      <Text style={{fontSize: 16}}>{content}</Text>
      <Text style={{fontSize: 12, color: platte.gray50}}>{date}</Text>
    </View>
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