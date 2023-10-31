import { View } from 'lucide-react-native';
import React, { useState } from 'react';
import { Switch, Text } from 'react-native';

interface PropsType {
  text?: string;
}

export default ({ text }: PropsType) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={{ flexDirection: 'row' }}>
      <Switch
        trackColor={{ false: '#E6E6E6', true: '#E6E6E6' }}
        thumbColor={isEnabled ? '#000000' : '#B3B3B3'}
        ios_backgroundColor="#FFFFFF"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text>{text}</Text>
    </View>
  );
};
