import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FormInput from './FormInput';
import CustomButton from '../UI/CustomButton';

const ExpenseForm = ({ onCancelHandler, onSubmitHandler, submitButtonLabel }) => {
  const [inputValue, setInputValue] = useState({
    amount: '',
    date: '',
    description: '',
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValue((prev) => {
      return { ...prev, [inputIdentifier]: enteredValue };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };

    onSubmitHandler(expenseData)
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <FormInput
          label='Amount'
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            value: inputValue.amount,
            onChangeText: inputChangeHandler.bind(this, 'amount'),
          }} // the enteredValue will be passed by ReactNative, we added extra param of inputIdentifier which we will pass here
        />
        <FormInput
          label='Date'
          style={styles.rowInput}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputValue.date,
            onChangeText: inputChangeHandler.bind(this, 'date'),
          }}
        />
      </View>
      <FormInput
        label='Description'
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          value: inputValue.description,
          onChangeText: inputChangeHandler.bind(this, 'description'),
        }}
      />

      <View style={styles.buttonsContainer}>
        <CustomButton mode='flat' onPress={onCancelHandler} style={styles.button}>
          Cancel
        </CustomButton>
        <CustomButton onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </CustomButton>
      </View>
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
    textAlign: 'center',
  },

  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowInput: {
    flex: 1,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
