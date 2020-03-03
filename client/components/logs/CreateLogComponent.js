import React, { Component } from 'react';
import { Text, View, Button, Switch } from 'react-native';
import { Card, Input, Rating } from 'react-native-elements';

import { Styles } from '../../styles/MainStyles';

import { localSource } from '../../assets/localSource';

class CreateLog extends Component {
  state = {
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
    year: null
  };

  componentDidMount() {
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
    console.log('SUBMITTING', this.state);
    if (!this.state.mood || !this.state.productivity) {
      let moodMsg = !this.state.mood && `You didn't select your mood`;
      let productivityMsg =
        !this.state.productivity && `You didn't select your productivity`;
      this.setState({
        moodMsg,
        productivityMsg
      });
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
      <View style={Styles.container}>
        <Text>THIS IS THE CREATE LOG COMPONENT</Text>
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
        <Text>What were some of your thoughts about today?</Text>
        <Input
          placeholder='max length 250 characters'
          onChangeText={text => this.setState({ journal: text })}
          value={this.state.journal}
        />
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
    );
  }
}

export default CreateLog;
