import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonPropsType {
  titleColor?: string;
  buttonColor?: string;
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export default ({ titleColor = '#FFF', buttonColor = '#000', title = 'button', onPress }: ButtonPropsType) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={onPress}>
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 15,
  },
});
