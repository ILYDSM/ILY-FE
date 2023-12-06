import { SafeAreaView, StyleSheet, View } from 'react-native';
import { MandalaArtItem } from './MandalArtItem';
import { GrayTheme } from './theme';

interface MandalArtPropsType {
  data?: string[];
  title?: string;
  theme?: MandalaArtThemeType | MandalaArtThemeType[];
}

const MandalArt = ({ data = [], title = '', theme = GrayTheme }: MandalArtPropsType) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <MandalaArtItem data={data[0]} style={theme?.sub[0] ?? theme?.sub[0]} />
        <MandalaArtItem data={data[1]} style={theme?.sub[1] ?? theme?.sub[0]} />
        <MandalaArtItem data={data[2]} style={theme?.sub[2] ?? theme?.sub[0]} />
      </View>
      <View style={styles.innerContainer}>
        <MandalaArtItem data={data[3]} style={theme?.sub[3] ?? theme?.sub[0]} />
        <MandalaArtItem data={title} style={theme?.title} />
        <MandalaArtItem data={data[4]} style={theme?.sub[4] ?? theme?.sub[0]} />
      </View>
      <View style={styles.innerContainer}>
        <MandalaArtItem data={data[5]} style={theme?.sub[5] ?? theme?.sub[0]} />
        <MandalaArtItem data={data[6]} style={theme?.sub[6] ?? theme?.sub[0]} />
        <MandalaArtItem data={data[7]} style={theme?.sub[7] ?? theme?.sub[0]} />
      </View>
    </SafeAreaView>
  );
};

export default MandalArt;

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
