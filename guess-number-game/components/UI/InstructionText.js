import { StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';

const InstructionText = ({ children, style }) => {
  // all the values of styles mentioned in arrar will be applies, but if there are same values in two elements
  // the righter values in array overwrite the values to its left for styling
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
});
