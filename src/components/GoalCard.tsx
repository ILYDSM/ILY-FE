import { Users } from 'lucide-react-native';
import { View, Text, TouchableOpacity, GestureResponderEvent, StyleSheet, Dimensions } from 'react-native';

interface GoalCardPropsType {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  theme: MandalaArtThemeType | MandalaArtThemeType[];
  isGroup?: boolean;
}

export default ({ text, onPress, theme, isGroup = false }: GoalCardPropsType) => {
  return (
    <TouchableOpacity onPress={onPress} style={Style.to}>
      <View style={[Style.card, theme.title]}>
        <Text style={[theme.title, Style.text]}>{text}</Text>
        {isGroup && <Users size={20} style={{ opacity: 0.75 }} color={theme.title.color} />}
      </View>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width / 2 - 22,
    padding: 8,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    gap: 8,
  },
  to: {
    flex: 1,
  },
  text: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    textAlign: 'center',
  },
});
