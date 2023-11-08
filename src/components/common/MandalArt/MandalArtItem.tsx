import { platte } from "@/styles/platte";
import { ColorValue, ImageBackground, StyleSheet, Text, View } from "react-native";

interface MandalArtDataTypes {
  title?: string;
  backgroundColor?: ColorValue;
  imageURI?: string;
  color?: ColorValue;
  borderWidth?: number;
  borderColor?: ColorValue;
}

interface ItemPropsType {
  data: MandalArtDataTypes;
  center: boolean;
  size: number;
}

export const NormalItem = (props: ItemPropsType) => {
  const { data } = props;
  const style = styles(props)
  return (
    <View style={style.container}>
      <Text style={style.title}>{data.title}</Text>
    </View>
  )
}
  
export const ImageItem = (props: ItemPropsType) => {
  const { data } = props;
  const style = styles(props)
  return (
    <ImageBackground
      source={{uri: data.imageURI as string}}
      style={style.container}
      resizeMode='cover'
    >
      <Text style={style.title}>{data.title}</Text>
    </ImageBackground>
  )
}

const styles = ({ data, center, size }: ItemPropsType) => StyleSheet.create({
  container: {
    backgroundColor: data.backgroundColor ?? (center ? platte.gray80 : platte.gray10),
    borderRadius: 4,
    width: size,
    height: size,
    overflow: 'hidden',
    borderWidth: data.borderWidth ?? 0,
    borderColor: data.borderColor ?? 'transparent',
  },
  title: {
    color: data.color ?? (center ? platte.gray00 : platte.gray80),
    fontSize: center ? 20 : 16,
    width: size,
    height: size,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})