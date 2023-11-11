import { platte } from "@/styles/platte";
import { StyleSheet } from "react-native";

const gray = StyleSheet.create({
  sub:{
    backgroundColor: platte.gray10,
    color: platte.gray80,
    fontSize: 16,
  },
  title:{
    backgroundColor: platte.gray80,
    color: platte.gray10,
    fontSize: 20,
    fontWeight: 500,
  }
})

export const GrayTheme = {
  sub:[gray.sub],
  title: gray.title
} as MandalaArtThemeType
