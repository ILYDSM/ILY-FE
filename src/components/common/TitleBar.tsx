import { GestureResponderEvent, Pressable, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface PropsTypes {
  title?: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const TitleBar = ({ title, disabled = false, onPress }: PropsTypes) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        underlayColor='#F2F2F2'
        onPress={onPress}
        disabled={disabled}
      >
        <View>
          <ChevronLeft
            size={28}
            color={disabled ? '#CCCCCC' : '#000000'}
          />
        </View>
      </TouchableHighlight>
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  );
}

export default TitleBar;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    borderRadius: 4,
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 28,
    fontWeight: '700'
  }
})