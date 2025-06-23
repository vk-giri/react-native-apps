import { StyleSheet, Text, View } from 'react-native';

import FormInput from './FormInput';

const ExpenseForm = () => {
  function amountChangeHandler() {}
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <FormInput
          label='Amount'
          textInputConfig={{ keyboardType: 'decimal-pad', onChangeText: amountChangeHandler }}
          style={styles.rowInput}
        />
        <FormInput
          label='Date'
          textInputConfig={{ placeholder: 'YYYY-MM-DD', maxLength: 10, onChangeText: () => {} }}
          style={styles.rowInput}
        />
      </View>
      <FormInput label='Description' textInputConfig={{ multiline: true, autoCorrect: false }} />
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24, 
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
});
