import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems
} from 'react-navigation';

const MainNavigator = createDrawerNavigator({
  Login: {}
});

class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>SUNLOG MAIN COMPONENT</Text>
        <Text>Open Drawer Navigator</Text>
      </View>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
