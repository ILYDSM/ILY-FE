import { GestureResponderEvent, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native"
import MandalArt from "@/components/common/MandalArt/MandalArt";
import { MandalaArtThemeKeyofType } from "@/types/theme";
import { themeDescription } from "@/types/themeDescription";
import { platte } from "@/styles/platte";

interface PropsType {
  isCheck?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  theme?: MandalaArtThemeKeyofType;
}

const MandalArtThemeCard = ({ isCheck, onPress, theme = 'GrayTheme' }: PropsType) => {  
  const description = themeDescription[theme];
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MandalArt theme={theme}/>
      <Text style={styles.Title}>{description.title} {isCheck && '✔'}</Text>
      <Text style={[styles.text, styles.gray]}>{description.text}</Text>
      <Text style={styles.text}>{description.point} 포인트</Text>
    </TouchableOpacity>
  )
}

export default MandalArtThemeCard;

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: Dimensions.get('window').width / 2 - 24
  },
  Title: {
    fontSize: 16,
    fontWeight: '700'
  },
  text: {
    fontSize: 16,
    fontWeight: '500'
  },
  gray: {
    color: platte.gray50
  }
});