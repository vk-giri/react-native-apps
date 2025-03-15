import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Image } from 'react-native';

const GoalInput = ({ addGoalHandler, showModal, hideAddGoalHandler }) => {
  const [goal, setGoal] = useState('');

  function goalInputHandler(enteredText) {
    setGoal(enteredText);
  }

  function addGoalHandlerToApp() {
    addGoalHandler(goal, setGoal);
  }

  return (
    <Modal visible={showModal} animationType='slide'>
      <View style={styles.inputContainer}>
        <Image style={styles.image} source={require('../assets/images/goal.png')} />
        <TextInput style={styles.textInput} placeholder='Your Course Goal' value={goal} onChangeText={goalInputHandler} />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Cancel' onPress={hideAddGoalHandler.bind(this)} color='#f31282' />
          </View>
          <View style={styles.button}>
            <Button title='Add Goal' onPress={addGoalHandlerToApp} color='#5e0acc' />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#311b6b',
  },

  image: {
    width: 100,
    height: 100,
    margin: 20,
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120348',
    width: '100%',
    borderRadius: 6,
    padding: 16,
  },

  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    width: 100,
    marginHorizontal: 12,
  },
});

export default GoalInput;
