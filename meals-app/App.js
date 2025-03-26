import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import FavouriteContextProvider from './store/context/favourite-context';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavouriteScreen from './screens/FavouriteScreen';

const MyStack = createNativeStackNavigator();
const MyDrawer = createDrawerNavigator();

function MyDrawerNavigator() {
  return (
    <MyDrawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#561D22FF' },
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        sceneStyle: {
          backgroundColor: '#4C0A10FF',
        },
        drawerContentStyle: {
          backgroundColor: '#4D1C20FF',
        },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#390409FF',
        drawerActiveBackgroundColor: '#B6868AFF',
        animationMatchesGesture: true,
      }}
    >
      <MyDrawer.Screen
        name='MealsCategories'
        component={CategoriesScreen}
        options={{ title: 'All Categories', drawerIcon: ({ color, size }) => <Ionicons name='list' color={color} size={size} /> }}
      />
      <MyDrawer.Screen
        name='Favourites'
        component={FavouriteScreen}
        options={{ title: 'My Favourites', drawerIcon: ({ color, size }) => <Ionicons name='star' color={color} size={size} /> }}
      />
    </MyDrawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <FavouriteContextProvider>
        <NavigationContainer>
          <MyStack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#561D22FF' },
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              contentStyle: {
                backgroundColor: '#4C0A10FF',
              },
              animationMatchesGesture: true,
              headerBackButtonDisplayMode: 'minimal',
            }}
          >
            <MyStack.Screen name='DrawerScreen' component={MyDrawerNavigator} options={{ headerShown: false }} />
            <MyStack.Screen name='MealsOverview' component={MealsOverviewScreen} />
            <MyStack.Screen name='MealDetail' component={MealDetailScreen} />
          </MyStack.Navigator>
        </NavigationContainer>
      </FavouriteContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
