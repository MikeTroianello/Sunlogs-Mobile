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
      <View>
        <View>
          <Text>SUNLOG MAIN COMPONENT</Text>
          <Text>Open Drawer Navigator</Text>
        </View>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name='Home' component={Test} />
          </Drawer.Navigator>
        </NavigationContainer>
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
