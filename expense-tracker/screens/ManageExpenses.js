import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { ExpensesContext } from '../store/expenses-context';

import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { GlobalStyles } from '../constants/styles';
import { storeExpense } from '../utils/http';

const ManageExpenses = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find((item) => item.id === editedExpenseId);

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

  async function confirmHandler(expenseData) {
    if (isEditing) expensesCtx.updateExpense(editedExpenseId, expenseData);
    else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id });
    }

    navigation.goBack();
  }

  return (
    <View style={styles.rootContainer}>
      <ExpenseForm
        initialData={selectedExpense}
        onCancelHandler={cancelHandler}
        onSubmitHandler={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
      />

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

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
