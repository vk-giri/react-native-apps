import { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native';

import Title from '../components/UI/Title';
import NumberContainer from '../components/Game/NumberContainer';
import PrimaryButton from '../components/UI/PrimaryButton';

function generateRandom(min, max) {
  const randomNum = Math.floor(Math.random() * (max - min)) + min;

  return randomNum;
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandom(minBoundary, maxBoundary));

  function nextGuessHandler(direction) {
    // the current guess is lower than the number user choose
    // but still we ask the device to guess a lower number, so we are lying
    // or vice versa, don't allow this step
    if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
      Alert.alert('Caught You', 'We must not tell Lies!', [{ text: 'Sorry Prof!', style: 'cancel' }]);
      return;
    }

    // guess a lower number than the current guess
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      // guess a higher number than current guess
      minBoundary = currentGuess + 1;
    }

    const newRandomNum = generateRandom(minBoundary, maxBoundary);
    setCurrentGuess(newRandomNum);
  }

  useEffect(() => {
    if (currentGuess === userNumber) {
      console.log('game over');
      onGameOver();
    }
  }, [currentGuess]);

  return (
    <View style={styles.screen}>
      <Title>Device's Guesss</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    paddingTop: StatusBar.currentHeight,
  },
});

export default GameScreen;
