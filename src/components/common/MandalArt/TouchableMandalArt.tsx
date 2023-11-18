import { SafeAreaView, StyleSheet, View } from 'react-native';
import { MandalaArtItem } from './MandalArtItem';
import { MandalaArtTheme, MandalaArtThemeKeyofType } from '@/types/theme';
import { TouchableMandalaArtItem } from './TouchableMandalaArtItem';

interface MandalArtPropsType {
  data?: string[];
  title?: string;
  theme?: MandalaArtThemeKeyofType;
  onTouchFn: (index: number) => void
}

const TouchableMandalArt = ({ data = [], title = '', theme = 'GrayTheme', onTouchFn }: MandalArtPropsType) => {
  const themeColor = MandalaArtTheme[theme];
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableMandalaArtItem data={data[0]} style={themeColor?.sub[0] ?? themeColor?.sub[0]} onPress={() => onTouchFn(0)}/>
        <TouchableMandalaArtItem data={data[1]} style={themeColor?.sub[1] ?? themeColor?.sub[0]} onPress={() => onTouchFn(1)}/>
        <TouchableMandalaArtItem data={data[2]} style={themeColor?.sub[2] ?? themeColor?.sub[0]} onPress={() => onTouchFn(2)}/>
      </View>
      <View style={styles.innerContainer}>
        <TouchableMandalaArtItem data={data[3]} style={themeColor?.sub[3] ?? themeColor?.sub[0]} onPress={() => onTouchFn(3)}/>
        <MandalaArtItem data={title} style={themeColor?.title}/>
        <TouchableMandalaArtItem data={data[4]} style={themeColor?.sub[4] ?? themeColor?.sub[0]} onPress={() => onTouchFn(4)}/>
      </View>
      <View style={styles.innerContainer}>
        <TouchableMandalaArtItem data={data[5]} style={themeColor?.sub[5] ?? themeColor?.sub[0]} onPress={() => onTouchFn(5)}/>
        <TouchableMandalaArtItem data={data[6]} style={themeColor?.sub[6] ?? themeColor?.sub[0]} onPress={() => onTouchFn(6)}/>
        <TouchableMandalaArtItem data={data[7]} style={themeColor?.sub[7] ?? themeColor?.sub[0]} onPress={() => onTouchFn(7)}/>
      </View>
    </SafeAreaView>
  );
}

export default TouchableMandalArt;

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection: 'column',
    gap: 8,
    aspectRatio: 1,
    width: '100%',
  },
  innerContainer:{
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  }
});