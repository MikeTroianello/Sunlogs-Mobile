import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Input, Rating } from 'react-native-elements';

import { Styles } from '../../styles/MainStyles';

class CreateLog extends Component {
  state = {
    mood: null,
    moodEmoji: null,
    productivity: null,
    journal: null,
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
      month: a[1],
      journal: ''
    });
  }

  render() {
    console.log(this.state);
    return (
      <View style={Styles.container}>
        <Text>THIS IS THE CREATE LOG COMPONENT</Text>
        <Text>What is your mood?</Text>
        <Rating
          imageSize={50}
          onFinishRating={rating => this.setState({ mood: rating })}
        />
        <Text>How productive do you think you were today?</Text>
        <Rating
          imageSize={50}
          onFinishRating={rating => this.setState({ productivity: rating })}
        />
        <Text>What were some of your thoughts about today?</Text>
        <Input
          placeholder='max length 250 characters'
          onTextChange={text => this.setState({ journal: text })}
        />
      </View>
    );
  }
}

export default CreateLog;
