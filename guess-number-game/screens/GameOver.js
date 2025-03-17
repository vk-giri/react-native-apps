import { Dimensions, Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React from 'react';
import Title from '../components/UI/Title';
import Colors from '../constants/Colors';
import PrimaryButton from '../components/UI/PrimaryButton';

const GameOver = ({ userNumber, rounds, onStartNewGame }) => {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 400) imageSize = 150;
  if (height < 600) imageSize = 80;

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <>
      <ScrollView style={styles.screen}>
        <View style={styles.rootContainer}>
          <Title>GAME OVER!</Title>
          <View style={[styles.imageContainer, imageStyle]}>
            <Image source={require('../assets/images/success.png')} style={styles.image} />
          </View>
          <Text style={styles.summaryText}>
            Your Phone took <Text style={styles.highlight}>{rounds}</Text> rounds to guess the number{' '}
            <Text style={styles.highlight}>{userNumber}</Text>
          </Text>
          <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
      </ScrollView>
    </>
  );
};

export default GameOver;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    // width: deviceWidth < 400 ? 200 : 300,
    // height: deviceWidth < 400 ? 200 : 300,
    // borderRadius: deviceWidth < 400 ? 100 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 24,
  },

  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});
