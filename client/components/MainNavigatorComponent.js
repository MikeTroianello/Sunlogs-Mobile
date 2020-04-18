import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux';

import LandingPageWEBSITE from './LandingPageWEBSITE';
import LandingPage from './LandingPage';
import Profile from './profiles/ProfileComponent';
import ViewOtherProfiles from './profiles/ViewOtherProfilesComponent';
import CreateLog from './logs/CreateLogComponent';
import ViewAllLogs from './ViewLogs/ViewAllLogsComponent';
import Settings from './account/SettingsComponent';
import Delete from '../components/account/DeleteComponent';
import SignUp from './account/SignUpComponent';
import Login from './account/LoginComponent.js';
import LogOut from './account/LogOut';
import LoadingPage from './LoadingPage';

import ViewLogsComponent from '../components/ViewLogs/ViewLogsComponent';

import ViewLogs from './ViewLogs/ViewLogs';
import FilterLog from './ViewLogs/FilterLogComponent';

import ParentView from './ViewLogs/ParentViewComponent';

import OtherProfiles from './profiles/OtherProfiles';

import ReduxInfo from './ReduxInfo';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const LogStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='See All Logs'
        component={ViewLogsComponent}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              color='#1776bf'
              type='font-awesome'
              name='bars'
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerLeftContainerStyle: {
            marginHorizontal: '5%',
          },
          headerTitle: 'See All Logs',
        })}
      />
      <Stack.Screen name='View Other Profiles' component={ViewOtherProfiles} />
    </Stack.Navigator>
  );
};
// const LogStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name='See All Logs' component={ViewAllLogs} />
//       <Stack.Screen name='View Other Profiles' component={ViewOtherProfiles} />
//     </Stack.Navigator>
//   );
// };

const ProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Your Profile'
        component={Profile}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              color='#1776bf'
              type='font-awesome'
              name='bars'
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerLeftContainerStyle: {
            marginHorizontal: '5%',
          },
          headerTitle: 'Your Profile',
        })}
      />
    </Stack.Navigator>
  );
};

const SettingStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Settings'
        component={Settings}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              color='#1776bf'
              type='font-awesome'
              name='bars'
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerLeftContainerStyle: {
            marginHorizontal: '5%',
          },
          headerTitle: 'Settings',
        })}
      />
      <Stack.Screen name='Delete Profile' component={Delete} />
    </Stack.Navigator>
  );
};

class MainNavigator extends Component {
  state = {
    x: 5,
  };

  render() {
    let drawerName;
    this.state.x == 6 ? (drawerName = 'See Logs') : (drawerName = 'Log In');
    const { username, createdToday } = this.props.userSettings;
    return (
      <View
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
          backgroundColor: '#ADD8E6',
        }}
      >
        <NavigationContainer>
          <Drawer.Navigator initialRouteName='LandingPage'>
            {!username && <Drawer.Screen name='Log In' component={Login} />}

            {username && !createdToday && (
              <Drawer.Screen name='Create Log' component={CreateLog} />
            )}

            <Drawer.Screen name='See Logs' component={LogStack} />
            {username && (
              <Drawer.Screen name='Profile' component={ProfileStack} />
            )}
            {username && (
              <Drawer.Screen name='Settings' component={SettingStack} />
            )}
            {username && <Drawer.Screen name='Logout' component={LogOut} />}
            {username && (
              <Drawer.Screen name='Redux Info' component={ReduxInfo} />
            )}
            <Drawer.Screen name='LoadingPage' component={LoadingPage} />
            <Drawer.Screen name='LandingPage' component={LandingPage} />
            <Drawer.Screen
              name='LandingPageWEBSITE'
              component={LandingPageWEBSITE}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userSettings: state.userSettings,
  };
};

export default connect(mapStateToProps)(MainNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e7ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
