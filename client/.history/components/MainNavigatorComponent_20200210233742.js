import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  createStackNavigator,
  // createDrawerNavigator,
  DrawerItems
} from 'react-navigation';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Test from './Test';
import Profile from './profiles/ProfileComponent';
import CreateLog from './logs/CreateLogComponent';
import ViewAllLogs from './ViewLogs/ViewAllLogsComponent';
import Settings from './Settings';

const Drawer = createDrawerNavigator();

class MainNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen name='Home' component={Test} />
          <Drawer.Screen name='See All Logs' component={ViewAllLogs} />
          <Drawer.Screen name='Create Log' component={CreateLog} />
          <Drawer.Screen name='Profile' component={Profile} />
          <Drawer.Screen name='Settings' component={Settings} />
          <Drawer.Screen name='Logout' component={Test} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default MainNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
