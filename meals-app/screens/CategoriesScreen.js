import { FlatList, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

function renderCategoryItem(navigation, itemData) {
  function onPressHandler() {
    navigation.navigate('MealsOverview', { categoryId: itemData.item.id });
  }

  return <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={onPressHandler} />;
}

const CategoriesScreen = ({ navigation }) => {
  return (
    <FlatList keyExtractor={(item) => item.id} data={CATEGORIES} renderItem={renderCategoryItem.bind(this, navigation)} numColumns={2} />
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
