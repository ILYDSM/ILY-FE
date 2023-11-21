import { View, Text, GestureResponderEvent } from 'react-native';
import CustomButton from './common/CustomButton';
import { ReactNode } from 'react';
import { platte } from '@/styles/platte';

interface ViewAllProps {
  title: string;
  children?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

export default ({ title, children, onPress }: ViewAllProps) => {
  return (
    <View
      style={{
        padding: 12,
        borderRadius: 12,
        flexDirection: 'column',
        gap: 8,
        borderColor: platte.gray10,
        borderWidth: 1,
      }}
    >
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={{ fontSize: 20, fontFamily: '700' }}>{title}</Text>
        <CustomButton title="모두 보기" size="S" onPress={onPress} />
      </View>
      {children}
    </View>
  );
};
