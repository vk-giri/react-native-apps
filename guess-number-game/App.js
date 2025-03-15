import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  return (
    <>
      <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.rootScreen}>
        <StatusBar style='auto' />
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMethod='cover'
          style={styles.rootScreen} // this is attached to the View inside of ImageBackGround
          imageStyle={styles.backgroundImage} // this is attached to the actual image of the component
        >
          <StartGameScreen />
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
