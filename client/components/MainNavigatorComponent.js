import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux';
import { loggedIn, logout } from '../redux/ActionCreators';
import * as SecureStore from 'expo-secure-store';

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

import { localSource } from '../assets/localSource';

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
    ready: false,
    success: false,
  };

  componentDidMount() {
    this.props.logout();
    SecureStore.getItemAsync('userinfo').then((userdata) => {
      const userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState(
          {
            username: userinfo.username,
            password: userinfo.password,
          },
          () => this.handleSubmit()
        );
      } else {
        this.setState({
          ready: true,
        });
      }
    });
  }

  handleSubmit = async (e) => {
    const { username, password } = this.state;
    if (!username) {
      this.setState({
        message: `You must include a username`,
      });
    } else if (!password) {
      this.setState({
        message: `You must include a password`,
      });
    } else {
      let today = new Date();
      var start = new Date(today.getFullYear(), 0, 0);
      var diff =
        today -
        start +
        (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
      var oneDay = 1000 * 60 * 60 * 24;
      let a = today.toString().split(' ');
      var day = Math.floor(diff / oneDay);
      let year = a[3];
      let state = { username, password, day, year };
      fetch(`${localSource}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      })
        .then((response) => response.json())
        .then((results) => {
          if (
            results.message == 'Incorrect username.' ||
            results.message == 'Incorrect password.' ||
            results.message == 'Unauthorized'
          ) {
            this.setState({
              message: 'Incorrect username or password!',
            });
          } else if (results.message == 'This account was deleted') {
            this.setState({
              message: 'This account was deleted.',
            });
          }
          else {
            this.props.loggedIn(results);
            this.setState(
              {
                ready: true,
                success: true,
              });
          }
        })
        .catch((error) => {
          this.setState({
            message: `Something went wrong`,
          });
        });
    }
  };

  render() {
    let drawerName;
    this.state.x == 6 ? (drawerName = 'See Logs') : (drawerName = 'Log In');
    const { username, createdToday } = this.props.userSettings;
    if (!this.state.ready) {
      return <LoadingPage />;
    } else {
      return (
        <View
          style={{
            flex: 1,
            paddingTop:
              Platform.OS === 'ios' ? 10 : Expo.Constants.statusBarHeight,
            backgroundColor: '#ADD8E6',
          }}
        >
          <NavigationContainer>
            <Drawer.Navigator>
              {!username && <Drawer.Screen name='Log In' component={Login} />}

              <Drawer.Screen name='See Logs' component={LogStack} />
              {username && !createdToday && (
                <Drawer.Screen name='Create Log' component={CreateLog} />
              )}

              {username && (
                <Drawer.Screen name='Profile' component={ProfileStack} />
              )}
              {username && (
                <Drawer.Screen name='Settings' component={SettingStack} />
              )}
              {username && <Drawer.Screen name='Logout' component={LogOut} />}
              {/* <Drawer.Screen name='Landing Page' component={LandingPage} /> */}
            </Drawer.Navigator>
          </NavigationContainer>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userSettings: state.userSettings,
  };
};

const mapDispatchToProps = {
  logout: () => logout(),
  loggedIn: () => loggedIn(),
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e7ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
