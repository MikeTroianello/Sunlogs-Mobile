import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Log from './ViewLogs/LogComponent';

const slides = [
  {
    key: 1,
    title: 'SUNLOGS',
    text: 'How much does weather affect your life?',
    backgroundImage: require('../assets/Background-Winter.png'),
    backgroundColor: '#59b2ab',
    mockLog: false,
  },
  {
    key: 2,
    title: 'Did you know:',
    text: `Over 3 MILLION Americans suffer from Seasonal Affective Disorder, or SAD, every year \nSAD can affect nearly every aspect of a person's life, from work, to relationships, to personal health. \nIt was this reason that Sunlogs was created`,
    image: null,
    // image: require('./assets/2.jpg'),
    backgroundImage: require('../assets/Background-Winter.png'),
    backgroundColor: '#febe29',
    mockLog: false,
  },
  {
    key: 3,
    title: 'What is Sunlogs?',
    text: `Sunlogs is a way to record your daily mood and how Productive you thought you were. \nYou can also create a journal for any feelings you might want to jot down.\nThese logs are then tied to the weather in your county, and will compare correlate mood respectively`,
    // image: require('./assets/3.jpg'),
    backgroundImage: require('../assets/Background-Winter.png'),
    image: null,
    backgroundColor: '#22bcb5',
    mockLog: true,
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
      </View>
    );
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    console.log('DONE');
    // this.setState({ showRealApp: true });
    this.props.navigation.navigate('Log In');
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name='md-checkmark' color='rgba(255, 255, 255, .9)' size={24} />
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
  container: {},
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
});
