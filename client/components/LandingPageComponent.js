import React, { Component } from 'react';
import { View, Text, Image, Button, ScrollView } from 'react-native';
// import {  } from 'react-native-elements';

import Log from './ViewLogs/LogComponent';

class LandingPage extends Component {
  state = {
    date: new Date(),
    message: 'This is the Home Page',
    err: false,
    signup: false,
    testLog: {
      id: '1335',
      genderIcon: 'female',
      weatherType: 'Clear',
      weatherIcon: '01n',
      hideCreator: false,
      state: 'Washington',
      county: 'King',
      mood: '4',
      productivity: '3',
      journal:
        'Overall, today felt like a good day. I was able to get most of what I wanted done. Enjoyed the bright skies!',
      privateJournal: false,
      creatorId: {
        username: 'Jane Doe',
        gender: 'female',
        _id: null
      },
      demo: true
    }
  };

  componentDidMount() {
    if (this.props.err && !this.state.err) {
      this.setState({
        message: 'You already created a log today!',
        err: true
      });
    }
    // this.props.setError(null);

    return <View>this.state.message</View>;
  }

  checkIfLoggedIn = () => {
    this.service
      .loggedin()
      .then(results => {})
      .catch(error => console.log(error));
  };

  logIt = results => {
    this.props.getUser(results);
    this.props.history.push('/profile');
  };

  toggle = () => {
    this.setState(prevState => ({
      signup: !prevState.signup
    }));
  };

  backToTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    let toggle;
    let thing;
    this.state.signup
      ? (toggle = 'Go back to Login')
      : (toggle = 'or, Create an Account Now!');
    this.state.signup ? (thing = 'card flipped') : (thing = 'card');

    return (
      <ScrollView>
        <View className='homepage-top'>
          <View className='homepage-greet'>
            <Text>SUNLOGS</Text>
            <Text>How much does weather affect your life?</Text>
          </View>
          <View className='signup-login-container'>
            <View className='container'>
              <View className={thing}>
                <View className='front card-View'>
                  <Text>Login</Text>
                </View>
                <View className='back card-View'>
                  <Text>Signup</Text>
                </View>
              </View>
            </View>
            <Button title={toggle} onClick={this.toggle} />
          </View>
        </View>
        <View className='homepage-separation'></View>
        <View className='homepage-sad'>
          <Text>Did you know:</Text>
          <Text>
            Over 3 MILLION Americans suffer from Seasonal Affective Disorder, or
            SAD, every year
          </Text>
          <Text>
            SAD can affect nearly every aspect of a person's life, from work, to
            relationships, to personal health. {'\n'}
            It was this reason that Sunlogs was created
          </Text>
        </View>
        <View className='homepage-sunlog'>
          <View className='sunlog-description'>
            <Text>What is Sunlogs?</Text>
            <Text>
              Sunlogs is a way to record your daily{' '}
              <Text style={{ fontWeight: 'bold' }}>Mood</Text> and how{' '}
              <Text style={{ fontWeight: 'bold' }}>Productive</Text> you thought
              you were.
            </Text>
            <Text>
              You can also create a journal for any feelings you might want to
              jot down.
            </Text>
            <Text>
              These logs are then tied to the weather in your county, and will
              compare correlate mood respectively
            </Text>
          </View>
          <View>
            <Log log={this.state.testLog} test={true} />
            <Text>(Your logs can be as private as you want them to be)</Text>
          </View>
        </View>
        <View>
          <Text className='sunlog-create'>CREATE AN ACCOUNT AND SEE!</Text>
          <View className='footer'>
            <View className='footer-contact'>
              <Text>Created by Mike Troianello</Text>
              <Text>
                Contact me at mike@troianello.co
                {/* <a href='mailto:mike@troianello.co'> mike@troianello.co</a> */}
              </Text>
              <Text>Visit my personal website troianello.co</Text>
            </View>
            <View className='footer-logo'>
              <Text className='mt-logo'>Mt</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default LandingPage;
