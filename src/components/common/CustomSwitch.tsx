import React, { useState } from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';

interface PropsType {
  text?: string;
}

export default ({ text }: PropsType) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Switch
        trackColor={{ false: '#E6E6E6', true: '#E6E6E6' }}
        thumbColor={isEnabled ? '#000000' : '#B3B3B3'}
        ios_backgroundColor="#E6E6E6"
        onValueChange={toggleSwitch}
        value={isEnabled}
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
