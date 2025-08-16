import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ExpensesContext } from '../store/expenses-context';

import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { GlobalStyles } from '../constants/styles';
import LoadingOvelay from '../components/UI/LoadingOvelay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpenses = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  async function deleteExpenseHandler() {
    setIsSubmitting(true);

    try {
      await deleteExpense(editedExpenseId);

      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - try again later');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not add/update expense - try again later');
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOvelay />;
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
