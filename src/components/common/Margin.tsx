import React from "react";
import { DimensionValue, View } from "react-native";

interface MarginPropsType {
  height?: DimensionValue;
}

export default ({ height }: MarginPropsType) => {
  return <View style={{ height }} />;
};
