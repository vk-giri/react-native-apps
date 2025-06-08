import { StyleSheet, View } from 'react-native';

import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

const dummy = [
  {
    id: 'e1',
    description: 'a pair of shoes',
    amount: 340,
    date: new Date('2025-04-12'),
  },
  {
    id: 'e3',
    description: 'apples',
    amount: 200,
    date: new Date('2025-01-2'),
  },
  {
    id: 'e2',
    description: 'book',
    amount: 150,
    date: new Date('2024-11-16'),
  },
  {
    id: 'e4',
    description: 'chair',
    amount: 600,
    date: new Date('2024-09-23'),
  },
  {
    id: 'e5',
    description: 'mobile',
    amount: 10000,
    date: new Date('2024-03-29'),
  }
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.rootContainer}>
      <ExpensesSummary expenses={dummy} periodName={expensesPeriod} />
      <ExpensesList expenses={dummy} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
