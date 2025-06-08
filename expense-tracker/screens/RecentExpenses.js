import { StyleSheet } from 'react-native';
import { useContext } from 'react';

import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { getDateMinusDays } from '../utils/date';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpense = expensesCtx.expenses.filter(expense => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7daysAgo;
  })

  return (
    <>
      <ExpensesOutput expenses={recentExpense} expensesPeriod={'Last 7 days'} fallbackText={"No Expenses In The Last 7 Days"} />
    </>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
