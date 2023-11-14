import { platte } from '@/styles/platte';
import { View, Text, Touchable, TouchableOpacity, GestureResponderEvent } from 'react-native';

interface GoalCardPropsType {
  color: string;
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export default ({ color, text }: GoalCardPropsType) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View
        style={{
          padding: 8,
          backgroundColor: color,
          height: 120,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700', color: platte.gray00, textAlign: 'auto' }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
