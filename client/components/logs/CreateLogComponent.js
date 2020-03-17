import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Switch,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { Card, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { setCreatedToday } from '../../redux/ActionCreators';

import { Styles } from '../../styles/MainStyles';

import { localSource } from '../../assets/localSource';

class CreateLog extends Component {
  state = {
    mood: null,
    moodEmoji: null,
    productivity: null,
    journal: '',
    privateJournal: this.props.userSettings.privateJournalDefault,
    hideCreator: this.props.userSettings.hideCreatorDefault,
    err: null,
    message: null,
    messageCss: 'red',
    day: null,
    year: null
  };

  componentDidMount() {
    console.log('REDUX INFO', this.props.userSettings);
    let today = new Date();
    var start = new Date(today.getFullYear(), 0, 0);
    var diff =
      today -
      start +
      (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
    var oneDay = 1000 * 60 * 60 * 24;
    let a = today.toString().split(' ');
    var day = Math.floor(diff / oneDay);
    let year = Number(a[3]);

    this.setState({
      dayOfYear: day,
      year: year,
      dayOfWeek: a[0],
      dayOfMonth: Number(a[2]),
      month: a[1]
    });
  }

  submit = () => {
    const { navigate } = this.props.navigation;

    if (!this.state.mood || !this.state.productivity) {
      let moodMsg = !this.state.mood && `You didn't select your mood`;
      let productivityMsg =
        !this.state.productivity && `You didn't select your productivity`;
      this.setState({
        moodMsg,
        productivityMsg
      });
    } else if (this.props.userSettings.createdToday) {
      console.log('YOU HAVE ALREADY CREATED A LOG');
      Alert.alert('Error', 'You have already created a log today!', [
        {
          text: 'OK',
          onPress: () => {
            navigate('See Logs');
          }
        }
      ]);
    } else {
      const info = this.state;
      fetch(`${localSource}/logs/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      })
        .then(response => response.json())
        .then(results => {
          // this.props.logIt(results);
          console.log(results);
        })
        .catch(error => {
          this.setState({
            message: `Username already exists!`
          });
        });
      this.props.setCreatedToday();
      this.setState(
        {
          mood: null,
          moodEmoji: null,
          productivity: null,
          journal: '',
          privateJournal: false,
          hideCreator: false,
          err: null,
          message: null,
          messageCss: 'red',
          day: null,
          year: null,
          dayOfYear: null,
          year: null,
          dayOfWeek: null,
          dayOfMonth: null,
          month: null,
          moodMsg: null,
          productivityMsg: null
        },
        navigate('See Logs')
      );
    }
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={Styles.createLogContainer}>
          <Text>CREATE A LOG</Text>
          <Text>What is your mood?</Text>
          <Rating
            imageSize={50}
            onFinishRating={rating => this.setState({ mood: rating })}
            startingValue={this.state.mood}
            minValue={1}
          />
          <Text>How productive do you think you were today?</Text>
          <Rating
            imageSize={50}
            onFinishRating={rating => this.setState({ productivity: rating })}
            minValue={1}
            startingValue={this.state.productivity}
          />

          <Text style={{ textAlign: 'center' }}>
            What were some of your thoughts about today?
          </Text>
          <View styles={{ width: '100%' }}>
            <Input
              placeholder='max length 250 characters'
              onChangeText={text => this.setState({ journal: text })}
              value={this.state.journal}
              autoCapitalize='sentences'
              maxLength={250}
              multiline={true}
              numberOfLines={3}
              textAlignVertical='top'
              containerStyle={{
                borderWidth: 1,
                margin: 5,
                width: '97%'
              }}
            />
          </View>

          <Text>Make this a private Log:</Text>
          <Switch
            value={this.state.privateJournal}
            onValueChange={value =>
              this.setState({ privateJournal: !this.state.privateJournal })
            }
          />
          <Text>Hide your status as creator:</Text>
          <Switch
            value={this.state.hideCreator}
            onValueChange={value =>
              this.setState({ hideCreator: !this.state.hideCreator })
            }
          />
          <Button title='Submit' onPress={this.submit} />
          <Text>{this.state.moodMsg}</Text>
          <Text>{this.state.productivityMsg}</Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userSettings: state.userSettings
  };
};

//MAP DISPATCH NEEDED

const mapDispatchToProps = {
  setCreatedToday: () => setCreatedToday()
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLog);
