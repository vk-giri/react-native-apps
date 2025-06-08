import { StyleSheet, Text, View } from 'react-native';

import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  return (
    <View style={styles.rootContainer}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {expenses.length ? <ExpensesList expenses={expenses} /> : <Text style={styles.infoText}>{fallbackText}</Text>}
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

  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
