import { useState } from 'react';
import { FlatList, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const DATA = [
  {
    title: '안 만들기'
  },
  {
    title: '제구'
  },
  {
    title: '구이'
  },
  {
    title: '멘탈'
  },
  {
    title: '드 구단 1래프트 8순위sssssssssssssssssssssssssssssssssss'
  },
  {
    title: '1.6km/h'
  },
  {
    title: '인성'
  },
  {
    title: 'LUK'
  },
  {
    title: '배나구'
  }
];

interface ItemPropsTypes {
  title?: string;
  center: boolean;
  width?: number;
}

const Item = ({ title, center, width }: ItemPropsTypes) => {
  return (
    <View
      style={{
        backgroundColor: center ? '#333' : '#E6E6E6',
        padding: 20,
        marginVertical: 4,
        marginHorizontal: 4,
        width: 120, // 'calc(100vw / 3)'
        height: 120,
        borderRadius: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        ellipsizeMode='clip'
        style={
        center ? { color: '#FFF', fontSize: 20, width: 100, height: 100, fontWeight: '700', textAlign: 'center' }
          : { color: '#333', fontSize: 16, width: 100, fontWeight: '500', textAlign: 'center' }
      }>
        {title}
      </Text>
    </View>
  )
}

const MandalArt = () => {
  // const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width)
  const margins = 39 * 2;
  const numColumns = 3;
  return (
    <SafeAreaView style={{ marginTop: 0 }}>
      <View style={{ paddingHorizontal: 33 }}>
        <FlatList
          data={DATA}
          // onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
          renderItem={({ item, index }) => (
            <Item
              title={item.title}
              center={index == 4}
              // width={(containerWidth - margins) / numColumns}
            />
          )}
          keyExtractor={(_, index) => `${index}`}
          numColumns={numColumns}
        />
      </View>
    </SafeAreaView>
  );
}

export default MandalArt;