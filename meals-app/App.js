import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';

const myStack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <myStack.Navigator>
          <myStack.Screen name='MealsCategories' component={CategoriesScreen}></myStack.Screen>
          <myStack.Screen name='MealsOverview' component={MealsOverviewScreen}></myStack.Screen>
        </myStack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
