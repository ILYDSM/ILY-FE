import { platte } from "@/styles/platte";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

interface MandalaArtItemProps{
  data: string;
  style?: object;
}

export function MandalaArtItem({data, style}:MandalaArtItemProps){
  return(
    <View style={[Styles.item, style]}>
      {/* <ImageBackground source={{}}> */}
        <Text style={[style, Styles.text]}>
          {data}
        </Text>
      {/* </ImageBackground> */}
    </View>
  )
}

const Styles = StyleSheet.create({
  item:{
    display: 'flex',
    aspectRatio: 1/1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    backgroundColor: undefined,
  }
})