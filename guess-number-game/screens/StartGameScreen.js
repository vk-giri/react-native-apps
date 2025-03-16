import { Alert, StatusBar, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import PrimaryButton from '../components/UI/PrimaryButton.js';
import Colors from '../constants/Colors.js';
import Title from '../components/UI/Title.js';
import Card from '../components/UI/Card.js';
import InstructionText from '../components/UI/InstructionText.js';

const StartGameScreen = ({ onConfirmNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState('');

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
      Alert.alert('Invalid Number', 'Number has to be between 1 and 99.', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }

    onConfirmNumber(chosenNumber);
  }

  return (
    <>
      <View style={styles.rootContainer}>
        <Title>Guess My Number</Title>
        <Card>
          <InstructionText>Enter A Number</InstructionText>

          <TextInput
            style={styles.numberInput}
            maxLength={2}
            keyboardType='number-pad'
            autoCorrect={false}
            value={enteredNumber}
            onChangeText={numberInputHandler}
          />

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
            </View>
          </View>
        </Card>
      </View>
    </>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 50,
    marginTop: 20,
    alignItems: 'center',
  },

  buttonsContainer: {
    flexDirection: 'row',
  },

  buttonContainer: {
    flex: 1,
  },

  numberInput: {
    height: 50,
    padding: 0,
    marginVertical: 8,
    fontSize: 32,
    width: 50,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
