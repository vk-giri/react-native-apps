import { StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';
import LoadingOvelay from '../components/UI/LoadingOvelay';

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);

  const recentExpense = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7daysAgo;
  });

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOvelay />;
  }

  return (
    <>
      <ExpensesOutput expenses={recentExpense} expensesPeriod={'Last 7 days'} fallbackText={'No Expenses In The Last 7 Days'} />
    </>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
