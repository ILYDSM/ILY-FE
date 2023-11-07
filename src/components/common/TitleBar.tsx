import { GestureResponderEvent, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { platte } from '@/styles/platte';

interface PropsTypes {
  title?: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const TitleBar = ({ title, disabled = false, onPress }: PropsTypes) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
      <View>
        <ChevronLeft size={28} color={disabled ? platte.gray20 : platte.gray100} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TitleBar;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 4,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
});
