import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Subtitle = ({ children }) => {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
  subtitleContainer: {
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 4,
    borderBottomColor: '#E3D1D3FF',
    borderBottomWidth: 2,
  },

  subtitle: {
    color: '#E3D1D3FF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
