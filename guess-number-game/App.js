import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/Colors';
import GameOver from './screens/GameOver';

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  function gameOverHandler() {
    setGameOver(true)
  }

  return (
    <>
      <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
        <StatusBar style='auto' />
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMethod='cover'
          style={styles.rootScreen} // this is attached to the View inside of ImageBackGround
          imageStyle={styles.backgroundImage} // this is attached to the actual image of the component
        >
          <SafeAreaView style={styles.rootScreen}>
            {!userNumber ? (
              <StartGameScreen onConfirmNumber={pickedNumberHandler} />
            ) : !gameOver ? (
              <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
            ) : (
              <GameOver />
            )}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },

  backgroundImage: {
    opacity: 0.15,
  },
});

// View only take up as much space as its children
