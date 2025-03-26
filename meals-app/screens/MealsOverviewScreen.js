import { useLayoutEffect } from 'react';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealsList from '../components/MealsList/MealsList';

const MealsOverviewScreen = ({ route, navigation }) => {
  const categoryId = route.params.categoryId;

  const meals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(categoryId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((item) => item.id === categoryId).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [navigation, categoryId]);

  return <MealsList items={meals} />;
};

export default MealsOverviewScreen;
