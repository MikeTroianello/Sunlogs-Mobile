import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Log from './ViewLogs/LogComponent';

import * as SecureStore from 'expo-secure-store';

import mockLog from '../mockLogs/mockLog.json';

const slides = [
  {
    key: 1,
    title: 'SUNLOGS',
    // text: 'How much does weather affect your life?',
    text: null,
    byline: 'How much does weather affect your life?',
    swipeLeftMessage: true,
    mockLog: false,
  },
  {
    key: 2,
    title: 'Did you know:',
    text: `Over 3 MILLION Americans suffer from Seasonal Affective Disorder, or SAD, every year \n\nSAD can affect nearly every aspect of a person's life, from work, to relationships, to personal health`,
    byline: null,
    image: null,
    swipeLeftMessage: false,
    backgroundColor: '#febe29',
    mockLog: false,
  },
  {
    key: 3,
    title: 'What is Sunlogs?',
    text: `Sunlogs is a way to record your daily mood and how Productive you thought you were. \n \nThese logs are then tied to the weather in your county, and will correlate mood respectively`,
    // image: require('./assets/3.jpg'),
    byline: null,
    image: null,
    swipeLeftMessage: false,
    backgroundColor: '#22bcb5',
    mockLog: true,
  },
  {
    key: 4,
    title: 'Sign Up Now',
    text: null,
    // image: require('./assets/3.jpg'),
    byline: `Click the check at the bottom right to get started!`,
    image: null,
    swipeLeftMessage: false,
    backgroundColor: '#22bcb5',
    mockLog: false,
  },
];

class LandingPage extends React.Component {
  state = {
    showRealApp: false,
  };
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        {item.byline && <Text style={styles.byline}>{item.byline}</Text>}
        {item.swipeLeftMessage && (
          <Text style={styles.swipeLeft}>(Swipe Left)</Text>
        )}
        {item.mockLog && <Log log={mockLog} />}
      </View>
    );
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    console.log('DONE');
    // this.setState({ showRealApp: true });
    SecureStore.setItemAsync('returning', {
      returning: true,
    });
    SecureStore.getItemAsync('returning').then((userdata) => {
      console.log('RETURNING?????????', userdata);
      const userinfo = JSON.parse(userdata);
      console.log('RETURNING?????????', userinfo);
    });
    this.props.navigation.navigate('Log In');
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name='md-checkmark' color='rgba(255, 255, 255, .9)' size={28} />
      </View>
    );
  };
  render() {
    // if (this.state.showRealApp) {
    //   return this.props.navigation.navigate('Log In');
    // } else {
    return (
      <ImageBackground
        source={require('../assets/Background-Winter.png')}
        style={styles.image}
      >
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
          renderDoneButton={this._renderDoneButton}
          style={styles.container}
        />
      </ImageBackground>
    );
  }
}
// }

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
  },
  slide: {
    width: '100%',
    height: '100%',
    color: 'blue',
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
  },
  image: {
    height: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    marginHorizontal: '10%',
  },
  byline: {
    textAlign: 'center',
    marginTop: '15%',
    marginHorizontal: '10%',
    fontSize: 26,
  },
  swipeLeft: {
    textAlign: 'center',
    marginTop: '10%',
    fontSize: 22,
  },
});
