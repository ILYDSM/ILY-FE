import { platte } from '@/styles/platte';
import React from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextProps, TouchableOpacity } from 'react-native';

type ButtonColorType = 'Gray' | 'Black' | 'Transparent';
type ButtonSizeType = 'L' | 'M' | 'S';

interface ButtonPropsType {
  color?: ButtonColorType;
  size?: ButtonSizeType;
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export default ({ color = 'Black', title = 'button', onPress, size = 'L' }: ButtonPropsType) => {
  return (
    <TouchableOpacity
      style={[styles.button, sizeGenerator(size), { backgroundColor: colorGenerator(color).backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: colorGenerator(color).fontColor, fontWeight: '600' }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const colorGenerator = (colorType: ButtonColorType): { backgroundColor: string; fontColor: string } => {
  switch (colorType) {
    case 'Black':
      return { backgroundColor: platte.gray100, fontColor: platte.gray00 };
    case 'Gray':
      return { backgroundColor: platte.gray10, fontColor: platte.gray100 };
    case 'Transparent':
      return { backgroundColor: 'transparent', fontColor: platte.gray100 };
    default:
      return { backgroundColor: platte.gray100, fontColor: platte.gray00 };
  }
};

const sizeGenerator = (size: ButtonSizeType) => {
  switch (size) {
    case 'L':
      return styles.Large;
    case 'M':
      return styles.Medium;
    case 'S':
      return styles.Small;
    default:
      return styles.Large;
  }
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
  },
  Large: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 4,
  },
  Medium: {
    borderRadius: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  Small: {
    borderRadius: 26,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
});
