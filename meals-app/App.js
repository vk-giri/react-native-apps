import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';

const myStack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <myStack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#561D22FF' },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            contentStyle: {
              backgroundColor: '#4C0A10FF',
            },
            animationMatchesGesture: true,
          }}
        >
          <myStack.Screen name='MealsCategories' component={CategoriesScreen} options={{ title: 'All Categories' }} />
          <myStack.Screen
            name='MealsOverview'
            component={MealsOverviewScreen}
            // options={({ route, navigation }) => {
            //   const catId = route.params.categoryId;
            //   return { title: catId };
            // }}
          />
          <myStack.Screen name='MealDetail' component={MealDetailScreen} />
        </myStack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
