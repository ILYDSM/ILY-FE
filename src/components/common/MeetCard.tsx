import {
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Users } from 'lucide-react-native';
import { platte } from '@/styles/platte';

interface PropsTypes {
  title?: string;
  description?: string;
  headCount?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

const MeetCard = ({ title = '모임이름', description = '모임의 설명', headCount = 0, onPress }: PropsTypes) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.contentBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{description}</Text>
          <View style={styles.bottomBox}>
            <Users size={24} color={platte.gray50} />
            <Text style={[styles.text, styles.Gray]}>{headCount}명이 함께하는 중</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MeetCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flexGrow: 1,
  },
  button: {
    backgroundColor: platte.gray00,
    borderRadius: 4,
    padding: 4,
  },
  contentBox: {
    gap: 4,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: '700',
  },
  text: {
    fontSize: 12,
    fontFamily: '500',
  },
  bottomBox: {
    gap: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Gray: {
    color: platte.gray50,
  },
});
