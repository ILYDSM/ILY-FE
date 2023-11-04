import { GestureResponderEvent, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Users } from 'lucide-react-native';

interface PropsTypes {
  title?: string;
  explan?: string;
  headCount?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

const MeetCard = ({ title = '모임이름', explan='모임의 설명', headCount = 0, onPress }: PropsTypes) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#F2F2F2"
        onPress={onPress}
      >
        <View style={styles.contentBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{explan}</Text>
          <View style={styles.bottomBox}>
            <Users size={24} color='#000000' />
            <Text style={[styles.text, styles.Gray]}>
              {headCount}명이 함께하는 중
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

export default MeetCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flexGrow: 1
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 4,
  },
  contentBox: {
    gap: 4,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  },
  text: {
    fontSize: 12,
    fontWeight: '500'
  },
  bottomBox: {
    gap: 4,
    alignItems: 'center',
    flexDirection: 'row'
  },
  Gray: {
    color: '#808080'
  }
})