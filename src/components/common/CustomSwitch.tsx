import React, { useState } from 'react';
import { Switch, View, Text, StyleSheet, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';
import { GestureResponderEvent } from 'react-native-modal';

interface PropsType {
  text?: string;
  onValueChange?: () => void;
  value: boolean;
}

export default ({ text, onValueChange, value }: PropsType) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Switch
        trackColor={{ false: '#E6E6E6', true: '#E6E6E6' }}
        thumbColor={value ? '#000000' : '#B3B3B3'}
        ios_backgroundColor="#E6E6E6"
        onValueChange={onValueChange}
        value={value}
      />
      <Text style={styles.switchText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  switchText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
});
