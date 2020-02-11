import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  createStackNavigator,
  // createDrawerNavigator,
  DrawerItems
} from 'react-navigation';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Test from './Test';

const Drawer = createDrawerNavigator();

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home' s>
          <Drawer.Screen name='Home' component={Test} />
        </Drawer.Navigator>
      </NavigationContainer>
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
