import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Styles } from '../../styles/MainStyles';
import Log from './LogComponent';

import mockLog from '../../mockLogs/mockLog.json';

class ViewAllLogs extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <Text>SEE ALL SUNLOGS HERE</Text>
        <Log log={mockLog} />
      </View>
    );
  }
}

export default ViewAllLogs;
