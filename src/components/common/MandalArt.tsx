import { useState } from 'react';
import { ImageSourcePropType, ColorValue, FlatList, Dimensions, SafeAreaView, StyleSheet, Text, View, ImageBackground } from 'react-native';

interface ItemPropsTypes {
  data: MandalArtDataTypes;
  center: boolean;
  size: number;
}

interface MandalArtTypes {
  data?: MandalArtDataTypes[];
  size?: number;
}

interface MandalArtDataTypes {
  title?: string;
  backgroundColor?: ColorValue;
  image?: ImageSourcePropType;
  color?: ColorValue;
  borderWidth?: number;
  borderColor?: ColorValue;
}

const NormalItem = (props: ItemPropsTypes) => {
  const { data } = props;
  const styles = ItemStyles(props)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
    </View>
  )
}

const ImageItem = (props: ItemPropsTypes) => {
  const { data } = props;
  const styles = ItemStyles(props)
  return (
    <ImageBackground
      source={data.image as ImageSourcePropType}
      style={styles.container}
    >
      <Text style={styles.title}>{data.title}</Text>
    </ImageBackground>
  )
}

const MandalArt = ({ data, size }: MandalArtTypes) => {
  const windowSize = Dimensions.get('window');
  const [containerWidth, setContainerWidth] = useState(windowSize.width);
  const numColumns = 3;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        extraData={data}
        renderItem={({ item, index }) => {
          const Data = {
            data: item,
            center: index === 4,
            size: (containerWidth - 16) / numColumns
          }

          if(item.image) {
            return <ImageItem {...Data} />
          } else {
            return <NormalItem {...Data} />
          }
          
        }}
        numColumns={numColumns}
        keyExtractor={(_, index) => `${index}`}
        onLayout={e => setContainerWidth(size || e.nativeEvent.layout.width)}
        ItemSeparatorComponent={() => <View style={styles.rowGap} />}
        columnWrapperStyle={styles.cloumnGap}
      />
    </SafeAreaView>
  );
}

export default MandalArt;

const ItemStyles = ({ data, center, size }: ItemPropsTypes) => StyleSheet.create({
  container: {
    backgroundColor: data.backgroundColor ?? (center ? '#333' : '#E6E6E6'),
    borderRadius: 4,
    width: size,
    height: size,
    overflow: 'hidden',
    borderWidth: data.borderWidth ?? 2,
    borderColor: data.borderColor ?? 'transparent',
  },
  title: {
    color: data.color ?? (center ? '#E6E6E6' : '#333333'),
    fontSize: center ? 20 : 16,
    width: size,
    height: size,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})

const styles = StyleSheet.create({
  container: {
    marginTop: 0
  },
  rowGap: {
    height: 8
  },
  cloumnGap: {
    gap: 8,
  }
});