import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../utils/date';

const ExpenseItem = ({ id, description, amount, date }) => {
  const navigation = useNavigation();

  function expensePressHandler() {
    navigation.navigate('ManageExpense', { expenseId: id });
  }

  const capitalizeFirstChar = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={expensePressHandler}>
        <View style={styles.expenseItemContainer}>
          <View>
            <Text style={[styles.textBase, styles.description]}>{capitalizeFirstChar(description)}</Text>
            <Text tyle={styles.textBase}>{getFormattedDate(date)}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{amount.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItemContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },

  textBase: {
    color: GlobalStyles.colors.primary50,
  },

  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },

  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 100,
  },

  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },

  pressed: {
    opacity: 0.75,
  },
});
