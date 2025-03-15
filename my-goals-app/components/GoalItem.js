import { Pressable, StyleSheet, Text, View } from 'react-native';

const GoalItem = ({ text, idx, deleteGoalHandler }) => {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: '#ddd' }}
        style={({ pressed }) => pressed && styles.pressedItem}
        onPress={deleteGoalHandler.bind(this, idx)}
      >
        <Text style={styles.goalText} key={idx}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e08cc',
  },

  pressedItem: {
    opacity: 0.5,
  },

  goalText: {
    padding: 8,
    color: 'white',
  },
});

export default GoalItem;
