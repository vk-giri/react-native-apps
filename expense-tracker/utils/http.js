import axios from 'axios';

const DATABASE_URL = 'https://social-login-okta-415004-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function storeExpense(expenseData) {
  try {
    const response = await axios.post(`${DATABASE_URL}/expenses.json`, expenseData);

    console.log('Data saved in DB successfully!');

    return response.data.name;
  } catch (error) {
    console.log('Error in saving data', error);
    throw error;
  }
}

export async function fetchExpenses() {
  try {
    const response = await axios.get(`${DATABASE_URL}/expenses.json`);
    const data = response.data;

    if (!data) return [];

    const expenses = Object.entries(data).map(([id, expense]) => ({
      id,
      amount: expense.amount,
      date: new Date(expense.date),
      description: expense.description,
    }));

    return expenses;
  } catch (error) {
    console.log('Error in fetching data!', error);
    throw error;
  }
}
