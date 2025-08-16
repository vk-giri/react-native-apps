import { StyleSheet } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';
import LoadingOvelay from '../components/UI/LoadingOvelay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const expensesCtx = useContext(ExpensesContext);

  const recentExpense = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7daysAgo;
  });

  useEffect(() => {
    async function getExpenses() {
      setLoading(true);

      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses');
      }

      setLoading(false);
    }

    getExpenses();
  }, []);

  if (error && !loading) {
    return <ErrorOverlay message={error} />;
  }

  if (loading) {
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
