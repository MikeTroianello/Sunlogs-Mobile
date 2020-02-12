import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Styles } from '../../styles/MainStyles';

class Settings extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text>THIS IS THE SETTINGS PAGE</Text>
      </View>
    );
  }
}

export default Settings;
