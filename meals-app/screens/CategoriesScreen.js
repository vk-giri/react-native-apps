import { FlatList, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

function renderCategoryItem(item, navigation) {
  function onPressHandler() {
    navigation.navigate('MealsOverview');
  }

  return <CategoryGridTile title={item.title} color={item.color} onPress={onPressHandler} />;
}

const CategoriesScreen = ({ navigation }) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={CATEGORIES}
      renderItem={({ item }) => renderCategoryItem(item, navigation)}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
