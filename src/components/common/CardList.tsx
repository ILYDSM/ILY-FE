import { ChevronRight } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface PropsType{
    title: string;
}

export default function CardList({title}:PropsType){
    const style = StyleSheet.create({
        main:{
            display: 'flex',
            flexDirection: 'row',
            padding: 4,
            gap: 8,
            borderRadius: 4
        },
        text:{
            width: '100%',
            fontSize: 16,
            fontWeight: '500'
        }
    });

    return(
        <View style={style.main}>
            <Text style={style.text}>{title}</Text>
            <ChevronRight size={20} color="#B3B3B3"/>
        </View>
    );
}