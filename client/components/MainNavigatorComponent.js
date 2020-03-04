import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux';

import Test from './Test';
import LandingPage from './LandingPageComponent';
import Profile from './profiles/ProfileComponent';
import ViewOtherProfiles from './profiles/ViewOtherProfilesComponent';
import CreateLog from './logs/CreateLogComponent';
import ViewAllLogs from './ViewLogs/ViewAllLogsComponent';
import Settings from './account/SettingsComponent';
import SignUp from './account/SignUpComponent';
import Login from './account/LoginComponent.js';
import LogOut from './account/LogOut';

import OtherProfiles from './profiles/OtherProfiles';

import ReduxInfo from './ReduxInfo';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const LogStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='See All Logs' component={ViewAllLogs} />
      <Stack.Screen name='View Other Profiles' component={ViewOtherProfiles} />
      {/* <Stack.Screen name='View Other Profiles' component={ViewOtherProfiles} /> */}
    </Stack.Navigator>
  );
};

class MainNavigator extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
        }}
      >
        <NavigationContainer>
          <Drawer.Navigator initialRouteName='Log In'>
            <Drawer.Screen name='Create Log' component={CreateLog} />
            <Drawer.Screen name='Home' component={LandingPage} />
            <Drawer.Screen name='See Logs' component={LogStack} />
            <Drawer.Screen name='Test' component={Test} />
            <Drawer.Screen name='Profile' component={Profile} />
            <Drawer.Screen name='Settings' component={Settings} />
            <Drawer.Screen name='Logout' component={LogOut} />
            <Drawer.Screen name='Sign Up' component={SignUp} />
            <Drawer.Screen name='Log In' component={Login} />
            <Drawer.Screen name='Redux Info' component={ReduxInfo} />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    createdToday: state.createdToday,
    hideCreatorDefault: state.hideCreatorDefault,
    hideProfile: state.hideProfile,
    privateJournalDefault: state.privateJournalDefault
  };
};

export default connect(mapStateToProps)(MainNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
