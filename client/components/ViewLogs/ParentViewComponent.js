import React, { Component } from 'react';
import { Text, View, FlatList, Button, Picker, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon, {
  MaterialCommunityIcons,
  FontAwesomeIcons,
} from 'react-native-vector-icons';

import Log from './LogComponent';

import ViewLogs from './ViewLogs';
import FilterLogs from './FilterLogComponent';

import { localSource } from '../../assets/localSource';

const Tab = createBottomTabNavigator();

class ParentView extends Component {
  state = {
    blah: '',
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.route.params) {
      if (this.state.blah != nextProps.route.params.info.instructions) {
        this.setState(
          {
            blah: nextProps.route.params.info.instructions,
          },
          () => this.forceUpdate()
        );

        return true;
      } else return false;
    } else return false;
  }

  render() {
    return (
      <NavigationContainer
        independent={true}
        onStateChange={(state) => this.forceUpdate()}
      >
        <Tab.Navigator>
          <Tab.Screen
            nav={this.nav}
            name='View Logs'
            component={ViewLogs}
            options={{
              tabBarLabel: 'View Logs',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name='weather-sunny'
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name='Filter'
            component={FilterLogs}
            options={{
              tabBarLabel: 'Filter Logs',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name='weather-sunset-down'
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default ParentView;
