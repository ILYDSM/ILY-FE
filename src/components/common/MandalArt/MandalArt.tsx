import { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { MandalaArtItem } from './MandalArtItem';

interface MandalArtPropsType {
  data: string[];
  title: string;
  theme?: MandalaArtThemeType;
}

const MandalArt = ({ data, title, theme }: MandalArtPropsType) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <MandalaArtItem data={data[0]}/>
        <MandalaArtItem data={data[1]}/>
        <MandalaArtItem data={data[2]}/>
      </View>
      <View style={styles.innerContainer}>
        <MandalaArtItem data={data[3]}/>
        <MandalaArtItem data={title}/>
        <MandalaArtItem data={data[4]}/>
      </View>
      <View style={styles.innerContainer}>
        <MandalaArtItem data={data[5]}/>
        <MandalaArtItem data={data[6]}/>
        <MandalaArtItem data={data[7]}/>
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