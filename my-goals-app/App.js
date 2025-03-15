import { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [showModal, setshowModal] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setshowModal(true);
  }

  function hideAddGoalHandler() {
    setshowModal(false);
  }

  function addGoalHandler(goal, setGoal) {
    if (goal === '') return;

    setCourseGoals((currentGoals) => [...currentGoals, { text: goal, id: Math.random().toString() }]);
    setGoal('');
    setshowModal(false);
  }

  function deleteGoalHandler(idx) {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((item) => item.id !== idx);
    });
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainter}>
        <Button title='Add New Goal' color='#5e08cc' onPress={startAddGoalHandler} />
        <GoalInput addGoalHandler={addGoalHandler} showModal={showModal} hideAddGoalHandler={hideAddGoalHandler} />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            renderItem={(itemData) => {
              return <GoalItem text={itemData.item.text} idx={itemData.item.id} deleteGoalHandler={deleteGoalHandler} />;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainter: {
    paddingTop: 50,
    paddingHorizontal: 18,
    flex: 1,
  },

  goalsContainer: {
    flex: 5,
  },
});
