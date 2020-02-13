import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Styles } from '../../styles/MainStyles';
import Log from './LogComponent';

import mockLog from '../../mockLogs/mockLog.json';
import mockLogs from '../../mockLogs/mockLogs.json';

class ViewAllLogs extends Component {
  render() {
    const renderCommentItem = ({ item }) => {
      return (
        <View style={{ margin: 10 }}>
          <Log log={item} />
        </View>
      );
    };
    return (
      <View style={Styles.container}>
        <Text>SEE ALL SUNLOGS HERE</Text>
        {/* <Log log={mockLog} /> */}
        <FlatList
          data={mockLogs}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

export default ViewAllLogs;
