import { FlatList, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

function renderCategoryItem(itemData) {
  return <CategoryGridTile title={itemData.item.title} color={itemData.item.color} />;
}

const CategoriesScreen = () => {
  return (
    <>
      <FlatList keyExtractor={(item) => item.id} data={CATEGORIES} renderItem={renderCategoryItem} numColumns={2} />
    </>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
