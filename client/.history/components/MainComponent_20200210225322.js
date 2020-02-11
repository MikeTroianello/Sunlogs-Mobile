import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  createStackNavigator,
  // createDrawerNavigator,
  DrawerItems
} from 'react-navigation';

import { createDrawerNavigator } from '@react-navigation/drawer';

const DrawerNavigator = createDrawerNavigator(
  {},
  {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#CEC8FF'
    // contentComponent: CustomDrawerContentComponent
  }
);

class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>SUNLOG MAIN COMPONENT</Text>
        <Text>Open Drawer Navigator</Text>
        <DrawerNavigator />
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
