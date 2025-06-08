import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { ExpensesContext } from '../store/expenses-context';

import IconButton from '../components/UI/IconButton';
import CustomButton from '../components/UI/CustomButton';
import { GlobalStyles } from '../constants/styles';

const ManageExpenses = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  // modifying the Navigation Params from inside the screen
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) expensesCtx.updateExpense(editedExpenseId, { description: 'test!!!!!', amount: 23, date: new Date() });
    else expensesCtx.addExpense({ description: 'test', amount: 20, date: new Date() });

    navigation.goBack();
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.buttonsContainer}>
        <CustomButton mode='flat' onPress={cancelHandler} style={styles.button}>
          Cancel
        </CustomButton>
        <CustomButton onPress={confirmHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </CustomButton>
      </View>

      {isEditing && (
        <>
          <View style={styles.deleteContainer}>
            <IconButton name='trash' size={36} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler} />
          </View>
        </>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
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

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
