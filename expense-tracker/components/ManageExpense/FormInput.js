import { StyleSheet, Text, TextInput, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

const FormInput = ({ label, textInputConfig, style }) => {
  const inputStyles = [styles.input];

  if (textInputConfig?.multiline) {
    inputStyles.push(styles.inputMultiLine);
  }

  return (
    <View style={[styles.rootContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  rootContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    // color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
