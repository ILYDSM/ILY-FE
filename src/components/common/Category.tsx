import { platte } from '@/styles/platte';
import { Check } from 'lucide-react-native';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GestureResponderEvent } from 'react-native-modal';

interface CategoryPropsType {
  clicked?: boolean;
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export default ({ clicked, text, onPress }: CategoryPropsType) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, clicked && { backgroundColor: platte.gray80 }]}>
        {clicked && <Check size={16} color={platte.gray00} />}
        <Text style={[styles.text, clicked && { color: platte.gray00 }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: platte.gray30,
    borderWidth: 1,
    borderRadius: 89,
    backgroundColor: platte.gray00,
    flexDirection: 'row',
    gap: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: platte.gray100,
  },
});
