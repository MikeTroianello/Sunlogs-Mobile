import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { localSource } from '../assets/localSource';

export default class Test extends Component {
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
    let year = a[3];

    fetch(`${localSource}/loggedIn/${day}/${year}`)
      .then(response => response.json())
      .then(results => {
        // this.props.logIt(results);
        console.log('SUCCESS');
        console.log(results);
      })
      .catch(error => {
        this.setState({
          message: `Username already exists!`
        });
      });
  }

  render() {
    return (
      <View>
        <Text>TEST</Text>
      </View>
    );
  }
}
