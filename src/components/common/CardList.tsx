import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, Pressable, View, GestureResponderEvent } from "react-native";

interface PropsType{
    title: string;
    onPress: (event: GestureResponderEvent) => void;
}

export default function CardList({title, onPress}:PropsType){
    const [IsPressing, setIsPrssing] = useState<boolean>(false)

    const style = StyleSheet.create({
        main:{
            display: 'flex',
            flexDirection: 'row',
            padding: 4,
            gap: 8,
            borderRadius: 4
        },
        mainPress:{
            backgroundColor: '#F2F2F2',
        },
        text:{
            width: '100%',
            fontSize: 16,
            fontWeight: '500'
        }
    });

    return(
        <Pressable onPress={onPress} onPressIn={()=>setIsPrssing(true)} onPressOut={()=>setIsPrssing(false)} style={[style.main ,IsPressing && style.mainPress]}>
            <Text style={style.text}>{title}</Text>
            <ChevronRight size={20} color="#B3B3B3"/>
        </Pressable>
    );
}