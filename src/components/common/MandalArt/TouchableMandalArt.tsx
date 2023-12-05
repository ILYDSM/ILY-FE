import { SafeAreaView, StyleSheet, View } from 'react-native';
import { MandalaArtItem } from './MandalArtItem';
import { TouchableMandalaArtItem } from './TouchableMandalaArtItem';
import { GrayTheme } from './theme';

interface MandalArtPropsType {
  data?: string[];
  title?: string;
  theme: MandalaArtThemeType | MandalaArtThemeType[];
  onTouchFn: (index: number) => void;
}

const TouchableMandalArt = ({ data = [], title = '', theme = GrayTheme, onTouchFn }: MandalArtPropsType) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableMandalaArtItem data={data[0]} style={theme?.sub[0] ?? theme?.sub[0]} onPress={() => onTouchFn(0)} />
        <TouchableMandalaArtItem data={data[1]} style={theme?.sub[1] ?? theme?.sub[0]} onPress={() => onTouchFn(1)} />
        <TouchableMandalaArtItem data={data[2]} style={theme?.sub[2] ?? theme?.sub[0]} onPress={() => onTouchFn(2)} />
      </View>
      <View style={styles.innerContainer}>
        <TouchableMandalaArtItem data={data[3]} style={theme?.sub[3] ?? theme?.sub[0]} onPress={() => onTouchFn(3)} />
        <MandalaArtItem data={title} style={theme?.title} />
        <TouchableMandalaArtItem data={data[4]} style={theme?.sub[4] ?? theme?.sub[0]} onPress={() => onTouchFn(4)} />
      </View>
      <View style={styles.innerContainer}>
        <TouchableMandalaArtItem data={data[5]} style={theme?.sub[5] ?? theme?.sub[0]} onPress={() => onTouchFn(5)} />
        <TouchableMandalaArtItem data={data[6]} style={theme?.sub[6] ?? theme?.sub[0]} onPress={() => onTouchFn(6)} />
        <TouchableMandalaArtItem data={data[7]} style={theme?.sub[7] ?? theme?.sub[0]} onPress={() => onTouchFn(7)} />
      </View>
    </SafeAreaView>
  );
};

export default TouchableMandalArt;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    aspectRatio: 1,
    width: '100%',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
});
