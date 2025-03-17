import { useEffect, useState } from 'react';
import { Alert, FlatList, StatusBar, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Title from '../components/UI/Title';
import NumberContainer from '../components/Game/NumberContainer';
import PrimaryButton from '../components/UI/PrimaryButton';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';
import GuessLogItem from '../components/Game/GuessLogItem';

function generateRandom(min, max) {
  const randomNum = Math.floor(Math.random() * (max - min)) + min;

  return randomNum;
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandom(minBoundary, maxBoundary));
  const [pastGuess, setPastGuess] = useState([currentGuess]);

  const { width, height } = useWindowDimensions();

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
    setPastGuess((prev) => [newRandomNum, ...prev]);
  }

  useEffect(() => {
    if (currentGuess === userNumber) {
      console.log('game over');
      onGameOver(pastGuess.length);
      return;
    }
  }, [currentGuess]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const contentPotrait = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name='remove' size={24} color='white' />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name='add' size={24} color='white' />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  const contentLandScape = (
    <>
      <View style={styles.buttonContainerWide}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name='remove' size={24} color='white' />
          </PrimaryButton>
        </View>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name='add' size={24} color='white' />
          </PrimaryButton>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.screen}>
      <Title>Device's Guess</Title>
      {width > 600 ? contentLandScape : contentPotrait}
      <View style={styles.listContainer}>
        <FlatList
          data={pastGuess}
          renderItem={({ item, index }) => <GuessLogItem roundNumber={pastGuess.length - index} guess={item} />}
          keyExtractor={(item) => item}
        />
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

  instructionText: {
    marginBottom: 16,
  },

  buttonsContainer: {
    flexDirection: 'row',
  },

  buttonContainer: {
    flex: 1,
  },

  buttonContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  listContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GameScreen;
