import React, { Component } from 'react';
import { View, Text, Image, Button, ScrollView } from 'react-native';
import { Linking, WebBrowser } from 'expo';
import * as MailComposer from 'expo-mail-composer';

import Log from './ViewLogs/LogComponent';

import mockLog from '../mockLogs/mockLog.json';

class LandingPage extends Component {
  state = {
    date: new Date(),
    message: 'This is the Home Page',
    err: false,
    signup: false,
    // testLog: {
    //   id: '1335',
    //   genderIcon: 'female',
    //   weatherType: 'Clear',
    //   weatherIcon: '01n',
    //   hideCreator: false,
    //   state: 'Washington',
    //   county: 'King',
    //   mood: '4',
    //   productivity: '3',
    //   journal:
    //     'Overall, today felt like a good day. I was able to get most of what I wanted done. Enjoyed the bright skies!',
    //   privateJournal: false,
    //   creatorId: {
    //     username: 'Jane Doe',
    //     gender: 'female',
    //     _id: null
    //   },
    //   demo: true
    // }
  };

  componentDidMount() {
    if (this.props.err && !this.state.err) {
      this.setState({
        message: 'You already created a log today!',
        err: true,
      });
    }
    // this.props.setError(null);

    return <View>this.state.message</View>;
  }

  checkIfLoggedIn = () => {
    this.service
      .loggedin()
      .then((results) => {})
      .catch((error) => console.log(error));
  };

  logIt = (results) => {
    this.props.getUser(results);
    this.props.history.push('/profile');
  };

  toggle = () => {
    this.setState((prevState) => ({
      signup: !prevState.signup,
    }));
  };

  backToTop = () => {
    window.scrollTo(0, 0);
  };

  sendMail = () => {
    MailComposer.composeAsync({
      recipients: ['mike@troianello.co'],
      subject: 'SunLogs App FeedBack',
      body: '',
    });
  };

  visitWebsite = () => {
    Linking.openURL('https://troianello.co');
    // WebBrowser.openBrowserAsync('https://troianello.co');
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
        <View className='homepage-greet'>
          <Text>SUNLOGS</Text>
          <Text>How much does weather affect your life?</Text>
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
            <Log log={mockLog} test={true} />
            <Text>(Your logs can be as private as you want them to be)</Text>
          </View>
        </View>
        <View>
          <Text className='sunlog-create'>CREATE AN ACCOUNT AND SEE!</Text>
          <View className='footer'>
            <View className='footer-contact'>
              <Text>Created by Mike Troianello</Text>
              <Text>
                Contact me at{' '}
                <Text style={{ color: 'blue' }} onPress={this.sendMail}>
                  mike@troianello.co
                </Text>
              </Text>
              <Text>
                Visit my personal website{' '}
                <Text style={{ color: 'blue' }} onPress={this.visitWebsite}>
                  troianello.co
                </Text>
              </Text>
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
