import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import { FavouriteContext } from '../store/context/favourite-context';

import MealsList from '../components/MealsList/MealsList';
import { MEALS } from '../data/dummy-data';

const FavouriteScreen = () => {
  // const favouriteMealCtx = useContext(FavouriteContext);
  const favMealsIds = useSelector((state) => state.favMeals.ids);

  // const favouriteMeals = MEALS.filter((meal) => favouriteMealCtx.ids.includes(meal.id));
  const favouriteMeals = MEALS.filter((meal) => favMealsIds.includes(meal.id));


  return favouriteMeals.length !== 0 ? (
    <MealsList items={favouriteMeals} />
  ) : (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>You have No Favourite Meals yet.</Text>
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
