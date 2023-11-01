import { SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface PropsTypes {
  children: React.ReactNode;
  disabled: boolean;
}

const TitleBar = ({ children, disabled }: PropsTypes) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#F2F2F2"
        onPress={() => { }}
        disabled={disabled}
      >
        <ChevronLeft
          size={28}
          color={disabled ? '#CCCCCC' : '#000000'}
        />
      </TouchableHighlight>
      <Text style={styles.title}>{children}</Text>
    </SafeAreaView>
  );
}

export default TitleBar;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 28,
    fontWeight: '700'
  }
})