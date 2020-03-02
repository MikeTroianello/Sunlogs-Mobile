import React, { Component } from 'react';
import { View } from 'react-native';

import { localSource } from '../../assets/localSource';

export default class Logout extends Component {
  componentDidMount() {
    console.log('ATTEMPTING TO LOG OUT');
    fetch(`${localSource}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
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
  }

  render() {
    return <View></View>;
  }
}
