import { StyleSheet } from 'react-native';
import { useContext } from 'react';

import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <>
      <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod={'Total'} fallbackText={"No Expenses Found!!"} />
    </>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
