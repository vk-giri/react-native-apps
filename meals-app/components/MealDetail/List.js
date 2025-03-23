import { StyleSheet, Text, View } from 'react-native';

const List = ({ data }) => {
  return data.map((item, index) => (
    <View key={index} style={styles.listItem}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  ));
};

export default List;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 4,
    backgroundColor: '#E3D1D3FF',
  },

  itemText: {
    color: '#561D22FF',
    textAlign: 'center'
  },
});
