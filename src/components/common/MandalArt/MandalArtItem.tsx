import { platte } from "@/styles/platte";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

interface MandalaArtItemProps{
  data: string;
}

export function MandalaArtItem({data}:MandalaArtItemProps){
  return(
    <View style={Styles.item}>
      <ImageBackground source={{}}>
        <Text>{data}</Text>
      </ImageBackground>
    </View>
  )
}

const Styles = StyleSheet.create({
  item:{
    display: 'flex',
    backgroundColor: 'red',
    aspectRatio: 1/1,
  }
})