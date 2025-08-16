import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);

    case 'UPDATE':
      return state.map((expense) => (expense.id === action.payload.id ? { ...expense, ...action.payload.data } : expense));

    case 'SET':
      // in our app we have the latest added expense on top, but if we fetch the value from DB it is at the last
      // since in firebase entries are chronologically ordered. Hence we will reverse the order we get from DB
      const reversedData = action.payload.reverse();
      return reversedData;

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses });
  }

  const value = { expenses: expensesState, addExpense, deleteExpense, updateExpense, setExpenses };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
