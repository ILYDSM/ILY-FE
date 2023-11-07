import { RootStackParam } from '@/utils/RootStackParam';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('NaverLogin')}>
      <View style={styles.layout}>
        <Image style={styles.image} source={require('../../../assets/login/naver.png')} />
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
    backgroundColor: '#03C75A',
  },
  image: {
    width: 20,
    height: 20,
  },
});
