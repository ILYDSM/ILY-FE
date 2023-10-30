import { StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/common/CustomButton';
import TabBar from '@/components/common/TabBar';
import { useState } from 'react';

export default () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
        {/* <CustomButton onPress={() => {}} />
        <Text style={styles.text}>hihi</Text> */}
        <TabBar />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 30,
  },
});
