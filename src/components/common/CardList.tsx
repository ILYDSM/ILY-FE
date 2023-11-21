import { ChevronRight } from "lucide-react-native";
import { StyleSheet, Text, Pressable, GestureResponderEvent } from "react-native";

interface PropsType{
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    disabled?: boolean;
}

export default function CardList({title, onPress, disabled}:PropsType){
    const style = StyleSheet.create({
        main:{
            display: "flex",
            flexDirection: "row",
            padding: 4,
            gap: 8,
            borderRadius: 4
        },
        mainPress:{
            backgroundColor: "#F2F2F2",
        },
        text:{
            flex: 1,
            fontSize: 16,
            fontFamily: "500",
        },
        textDisabled:{
            color: "#CCCCCC",
        }
    });

    return(
        <Pressable disabled={disabled} style={({pressed})=>[style.main ,pressed && style.mainPress]} onPress={onPress}>
            <Text style={[style.text, disabled && style.textDisabled]}>{title}</Text>
            <ChevronRight size={20} color={disabled ?  "#CCCCCC" : "#B3B3B3"}/>
        </Pressable>
    );
}