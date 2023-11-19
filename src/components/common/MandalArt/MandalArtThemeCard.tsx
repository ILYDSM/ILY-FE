import { GestureResponderEvent, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native"
import MandalArt from "@/components/common/MandalArt/MandalArt";
import { platte } from "@/styles/platte";
import { GrayTheme } from './theme';

interface PropsType {
  isCheck?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  theme?: MandalaArtThemeType;
  disabled?: boolean;
}

const MandalArtThemeCard = ({ isCheck, onPress, theme = GrayTheme, disabled }: PropsType) => {  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
      <MandalArt theme={theme}/>
      <Text style={styles.Title}>{theme.description.title} {isCheck && '✔'}</Text>
      <Text style={[styles.text, styles.gray]}>{theme.description.text}</Text>
      <Text style={styles.text}>{theme.description.point} 포인트</Text>
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