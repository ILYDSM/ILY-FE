import { SafeAreaView, StyleSheet, View, TextInput } from 'react-native';
import { MandalaArtItem } from './MandalArtItem';
import { GrayTheme } from './theme';

interface MandalArtPropsType {
  data: string[];
  title: string;
  onChangeData: (data: string[]) => void;
  theme?: MandalaArtThemeType;
}

const MandalArtEdit = ({ data, title, onChangeData, theme = GrayTheme }: MandalArtPropsType) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput multiline value={data[0]} style={[styles.item, theme?.sub[0] ?? theme?.sub[0]]} onChangeText={(text: string) => onChangeData([text, ...data.slice(1)])}/>
        <TextInput multiline value={data[1]} style={[styles.item, theme?.sub[1] ?? theme?.sub[0]]} onChangeText={(text: string) => onChangeData([data[0], text, ...data.slice(2)])}/>
        <TextInput multiline value={data[2]} style={[styles.item, theme?.sub[2] ?? theme?.sub[0]]} onChangeText={(text: string) => onChangeData([...data.slice(0, 2), text, ...data.slice(3)])}/>
      </View>
      <View style={styles.innerContainer}>
        <TextInput multiline value={data[3]} style={[styles.item, theme?.sub[3] ?? theme?.sub[0]]} onChangeText={(text: string) => onChangeData([...data.slice(0, 3), text, ...data.slice(4)])}/>
        <MandalaArtItem data={title} style={theme?.title} />
        <TextInput multiline value={data[4]} style={[styles.item, theme?.sub[4] ?? theme?.sub[0]]} onChangeText={(text: string) => onChangeData([...data.slice(0, 4), text, ...data.slice(5)])}/>
      </View>
      <View style={styles.innerContainer}>
        <TextInput multiline value={data[5]} style={[styles.item, theme?.sub[5] ?? theme?.sub[0]]} onChangeText={(text: string) => onChangeData([...data.slice(0, 5), text, ...data.slice(6)])}/>
        <TextInput multiline value={data[6]} style={[styles.item, theme?.sub[6] ?? theme?.sub[0]]} onChangeText={(text: string) => onChangeData([...data.slice(0, 6), text, data[7]])}/>
        <TextInput multiline value={data[7]} style={[styles.item, theme?.sub[7] ?? theme?.sub[0]]} onChangeText={(text: string) => onChangeData([...data.slice(0, 7), text])}/>
      </View>
    </SafeAreaView>
  );
}

export default MandalArtEdit;

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
  item: {
    display: 'flex',
    aspectRatio: 1 / 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
});