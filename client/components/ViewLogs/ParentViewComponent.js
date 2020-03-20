import React, { Component } from 'react';
import { Text, View, FlatList, Button, Picker, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Log from './LogComponent';

import ViewLogs from './ViewLogs';
import FilterLogs from './FilterLogComponent';

import { localSource } from '../../assets/localSource';

const Tab = createBottomTabNavigator();

class ParentView extends Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name='View' component={ViewLogs} />
          <Tab.Screen name='Filter' component={FilterLogs} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default ParentView;
