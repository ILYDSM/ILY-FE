import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParam } from '@/utils/RootStackParam';

export default () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('KakaoLogin')}>
      <View style={styles.layout}>
        <Image style={styles.image} source={require('../../../assets/login/kakao.png')} />
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
    backgroundColor: '#FEE500',
  },
  image: {
    width: 20,
    height: 20,
  },
});
