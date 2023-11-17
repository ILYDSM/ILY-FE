import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MandalaArtItemProps{
  data: string;
  style?: object;
  onPress?: () => void;
}

export function TouchableMandalaArtItem({data, style, onPress}:MandalaArtItemProps){
  return(
    <TouchableOpacity style={[Styles.item, style]} onPress={onPress} disabled={data === ''}>
      <Text style={[style, Styles.text]}>
        {data}
      </Text>
    </TouchableOpacity>
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
    backgroundColor: 'transparent',
    borderWidth: 0,
    textAlign: "center"
  }
})