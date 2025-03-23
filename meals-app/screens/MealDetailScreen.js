import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect, useState } from 'react';

import { MEALS } from '../data/dummy-data';
import MealExtraDetails from '../components/MealExtraDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';

const MealDetailScreen = ({ route, navigation }) => {
  const [icon, setIcon] = useState('star-outline');

  const { mealId } = route.params;

  const selectedMeal = MEALS.find((item) => item.id === mealId);

  function headerButtonPressHandler() {
    setIcon((prev) => (prev === 'star' ? 'star-outline' : 'star'));
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal.title,
      headerRight: () => {
        return <IconButton icon={icon} color={'white'} onPress={headerButtonPressHandler} />;
      },
    });
  }, [navigation, selectedMeal, headerButtonPressHandler]);

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
