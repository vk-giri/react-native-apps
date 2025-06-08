import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';

import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';

const myStack = createNativeStackNavigator();
const myBottomTab = createBottomTabNavigator();

function ExpensesOverView() {
  return (
    <myBottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            name='add'
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpense');
            }}
          />
        ),
      })}
    >
      <myBottomTab.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' size={size} color={color} />,
        }}
      />
      <myBottomTab.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />,
        }}
      />
    </myBottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <myStack.Navigator>
          <myStack.Screen name='ExpensesOverView' component={ExpensesOverView} options={{ headerShown: false }} />
          <myStack.Screen name='ManageExpense' component={ManageExpenses} />
        </myStack.Navigator>
      </NavigationContainer>
    </>
  );
}
