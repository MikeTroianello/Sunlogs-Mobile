import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Styles } from '../../styles/MainStyles';

class ViewAllLogs extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text>SEE ALL SUNLOGS HERE</Text>
      </View>
    );
  }
}

export default ViewAllLogs;
