import { View, Text, TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native';

interface GoalCardPropsType {
  color: string;
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  theme: MandalaArtThemeType
}

export default ({ text, onPress, theme }: GoalCardPropsType) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={[Style.card, theme.title]}>
        <Text style={[theme.title, Style.text]}>{text}</Text>
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