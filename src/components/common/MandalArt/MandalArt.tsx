import { useState } from 'react';
import { ColorValue, FlatList, Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { ImageItem, NormalItem } from './MandalArtItem';

interface MandalArtPropsType {
  data?: MandalArtDataTypes[];
  size?: number;
}

interface MandalArtDataTypes {
  title?: string;
  backgroundColor?: ColorValue;
  imageURI?: string;
  color?: ColorValue;
  borderWidth?: number;
  borderColor?: ColorValue;
}

const MandalArt = ({ data, size }: MandalArtPropsType) => {
  const windowSize = Dimensions.get('window');
  const [containerWidth, setContainerWidth] = useState(windowSize.width);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        extraData={data}
        renderItem={({ item, index }) => {
          console.log(item, index)
          const Data = {
            data: item,
            center: index === 4,
            size: (containerWidth - 16) / 3
          }

          if(item.imageURI) {
            return <ImageItem {...Data} />
          } else {
            return <NormalItem {...Data} />
          }
          
        }}
        numColumns={3}
        keyExtractor={(_, index) => `${index}`}
        onLayout={e => setContainerWidth(size || e.nativeEvent.layout.width)}
        ItemSeparatorComponent={() => <View style={styles.rowGap} />}
        columnWrapperStyle={styles.cloumnGap}
      />
    </SafeAreaView>
  );
}

export default MandalArt;


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