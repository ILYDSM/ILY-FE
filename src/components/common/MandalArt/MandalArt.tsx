import { SafeAreaView, StyleSheet, View } from 'react-native';
import { MandalaArtItem } from './MandalArtItem';
import { MandalaArtTheme, MandalaArtThemeKeyofType } from "@/types/theme";

interface MandalArtPropsType {
  data?: string[];
  title?: string;
  theme?: MandalaArtThemeKeyofType;
}

const MandalArt = ({ data = [], title = '', theme = 'GrayTheme' }: MandalArtPropsType) => {
  const themeColor = MandalaArtTheme[theme];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <MandalaArtItem data={data[0]} style={themeColor?.sub[0] ?? themeColor?.sub[0]}/>
        <MandalaArtItem data={data[1]} style={themeColor?.sub[1] ?? themeColor?.sub[0]}/>
        <MandalaArtItem data={data[2]} style={themeColor?.sub[2] ?? themeColor?.sub[0]}/>
      </View>
      <View style={styles.innerContainer}>
        <MandalaArtItem data={data[3]} style={themeColor?.sub[3] ?? themeColor?.sub[0]}/>
        <MandalaArtItem data={title} style={themeColor?.title}/>
        <MandalaArtItem data={data[4]} style={themeColor?.sub[4] ?? themeColor?.sub[0]}/>
      </View>
      <View style={styles.innerContainer}>
        <MandalaArtItem data={data[5]} style={themeColor?.sub[5] ?? themeColor?.sub[0]}/>
        <MandalaArtItem data={data[6]} style={themeColor?.sub[6] ?? themeColor?.sub[0]}/>
        <MandalaArtItem data={data[7]} style={themeColor?.sub[7] ?? themeColor?.sub[0]}/>
      </View>
    </SafeAreaView>
  );
}

export default MandalArt;

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