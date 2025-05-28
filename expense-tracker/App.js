import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';

const myStack = createNativeStackNavigator();
const myBottomTab = createBottomTabNavigator();

function ExpensesOverView() {
  return (
    <myBottomTab.Navigator>
      <myBottomTab.Screen name='RecentExpenses' component={RecentExpenses} />
      <myBottomTab.Screen name='AllExpenses' component={AllExpenses} />
    </myBottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <myStack.Navigator>
          <myStack.Screen name='ExpensesOverView' component={ExpensesOverView} />
          <myStack.Screen name='ManageExpense' component={ManageExpenses} />
        </myStack.Navigator>
      </NavigationContainer>
    </>
  );
}
