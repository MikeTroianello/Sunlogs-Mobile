import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems
} from 'react-navigation';

class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 1
        }}
      >
        <Text>SUNLOG MAIN COMPONENT</Text>
      </View>
    );
  }
}

export default Main;
