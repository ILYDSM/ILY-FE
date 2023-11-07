import { platte } from '@/styles/platte';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export default () => {
  return (
    <TouchableOpacity>
      <View style={styles.layout}>
        <Image style={styles.image} source={require('../../../assets/login/google.png')} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  layout: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: platte.gray05,
  },
  image: {
    width: 20,
    height: 20,
  },
});
