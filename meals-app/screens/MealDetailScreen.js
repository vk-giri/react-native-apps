import { useContext, useLayoutEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { FavouriteContext } from '../store/context/favourite-context';

import { MEALS } from '../data/dummy-data';
import MealExtraDetails from '../components/MealExtraDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';

const MealDetailScreen = ({ route, navigation }) => {
  const favouriteMealsCtx = useContext(FavouriteContext);

  const { mealId } = route.params;
  const selectedMeal = MEALS.find((item) => item.id === mealId);
  const isMealFavourite = favouriteMealsCtx.ids.includes(mealId);

  function changeFavouriteStateHandler() {
    if (isMealFavourite) favouriteMealsCtx.removeFavourite(mealId);
    else favouriteMealsCtx.addFavourite(mealId);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal.title,
      headerRight: () => {
        return <IconButton icon={isMealFavourite ? 'star' : 'star-outline'} color={'white'} onPress={changeFavouriteStateHandler} />;
      },
    });
  }, [navigation, selectedMeal, changeFavouriteStateHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>

      <MealExtraDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />

          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },

  image: {
    width: '100%',
    height: 350,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },

  detailText: {
    color: 'white',
  },

  listOuterContainer: {
    alignItems: 'center',
  },

  listContainer: {
    width: '80%',
  },
});
