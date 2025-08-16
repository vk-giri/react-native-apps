import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FormInput from './FormInput';
import CustomButton from '../UI/CustomButton';
import { getFormattedDate } from '../../utils/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({ onCancelHandler, onSubmitHandler, submitButtonLabel, initialData }) => {
  const [inputValue, setInputValue] = useState({
    amount: initialData?.amount != null ? initialData.amount.toString() : '',
    date: initialData?.date ? getFormattedDate(initialData.date) : '',
    description: initialData?.description != null ? initialData.description.toString() : '',
  });

  const [isInputValid, setIsInputValid] = useState({
    amount: true,
    date: true,
    description: true,
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValue((prev) => {
      return { ...prev, [inputIdentifier]: enteredValue };
    });

    // if a value is entered, we are treating it as VALID, will do validation during submission
    setIsInputValid((prev) => {
      return { ...prev, [inputIdentifier]: true };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = !isNaN(expenseData.date);
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      setIsInputValid({
        amount: isAmountValid,
        date: isDateValid,
        description: isDescriptionValid,
      });

      return;
    }

    onSubmitHandler(expenseData);
  }

  const isFormInvalid = !isInputValid.amount || !isInputValid.date || !isInputValid.description;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <FormInput
          label='Amount'
          style={styles.rowInput}
          isInvalid={!isInputValid.amount}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            value: inputValue.amount,
            onChangeText: inputChangeHandler.bind(this, 'amount'),
          }} // the enteredValue will be passed by ReactNative, we added extra param of inputIdentifier which we will pass here
        />
        <FormInput
          label='Date'
          style={styles.rowInput}
          isInvalid={!isInputValid.date}
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
        isInvalid={!isInputValid.description}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          value: inputValue.description,
          onChangeText: inputChangeHandler.bind(this, 'description'),
        }}
      />
      {isFormInvalid && <Text style={styles.errorText}>Invalid Input Values. Please check all the Inputs!!</Text>}

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

  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
