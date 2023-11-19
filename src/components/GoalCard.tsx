import { MandalaArtTheme, MandalaArtThemeKeyofType } from '@/types/theme';
import { View, Text, TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native';

interface GoalCardPropsType {
  color: string;
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  theme: MandalaArtThemeKeyofType;
}

export default ({ text, onPress, theme }: GoalCardPropsType) => {
  const themeColor = MandalaArtTheme[theme];

  return (
    <TouchableOpacity onPress={onPress} >
      <View style={[Style.card, themeColor.title]}>
        <Text style={[themeColor.title, Style.text]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  card:{
    padding: 8,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  text:{
    backgroundColor: 'transparent',
    borderWidth: 0,
    textAlign: 'center'
  }
})