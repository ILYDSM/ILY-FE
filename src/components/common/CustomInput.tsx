import { platte } from '@/styles/platte';
import { StyleSheet, TextInput, View, Text, TextInputProps } from 'react-native';
import { ReactNode } from 'react';

interface CustomInputPropsType extends TextInputProps {
  text: string;
  description?: string;
  icon?: ReactNode;
  isError?: boolean;
}

export default ({ text, description, icon, isError = false, ...props }: CustomInputPropsType) => {
  return (
    <View>
      <View style={[styles.container, isError && { borderColor: platte.red, borderWidth: 2 }]}>
        <Text>{text}</Text>
        <TextInput
          {...props}
          selectionColor={platte.gray100}
          style={[styles.input, !!icon && { paddingRight: 36 }]}
          placeholderTextColor={platte.gray30}
        />
        {icon && <View style={styles.icon}>{icon}</View>}
      </View>
      {description && <Text style={[styles.description, isError && { color: platte.red }]}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'tranparent',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderColor: platte.gray30,
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    height: 25,
    padding: 2,
    fontSize: 16,
    fontFamily: '500',
  },
  text: {
    fontSize: 12,
    fontFamily: '500',
  },
  description: {
    fontSize: 14,
    fontFamily: '500',
    color: platte.gray50,
    marginTop: 4,
  },
  icon: {
    position: 'absolute',
    right: 14,
    bottom: 14,
  },
});
