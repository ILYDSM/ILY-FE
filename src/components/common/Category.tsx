import { platte } from '@/styles/platte';
import { Check } from 'lucide-react-native';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CategoryPropsType {
  clicked?: boolean;
  text: string;
}

export default ({ clicked, text }: CategoryPropsType) => {
  return (
    <TouchableOpacity>
      <View style={[styles.container, clicked && { backgroundColor: platte.gray80 }]}>
        {clicked && <Check size={20} color={platte.gray00} />}
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
