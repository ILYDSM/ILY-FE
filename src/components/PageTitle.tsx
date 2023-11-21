import { StyleSheet, Text, View } from 'react-native';

interface PageTitlePropsType {
  title: string;
}

export default ({ title }: PageTitlePropsType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 28,
    fontFamily: '700',
  },
});
