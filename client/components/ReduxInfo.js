import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import * as SecureStore from 'expo-secure-store';

import { loggedIn } from '../redux/ActionCreators';

import { styles } from '../styles/MainStyles';

class ReduxInfo extends Component {
  state = {
    secureStoreUsername: null,
    secureStorePassword: null,
    returning: null,
  };

  componentDidMount() {
    SecureStore.getItemAsync('userinfo').then((userdata) => {
      const userinfo = JSON.parse(userdata);
      console.log('THE USER INFO', userinfo);
      if (userinfo) {
        this.setState({ secureStoreUsername: userinfo.username });
        this.setState({ secureStorePassword: userinfo.password });
      }
    });

    SecureStore.getItemAsync('returning').then((userdata) => {
      const returnInfo = JSON.parse(userdata);
      console.log('THE USER DATA', returnInfo);
      this.setState({
        returning: returnInfo.returning,
      });
    });
  }

  render() {
    console.log('WHaT WE MAPPED FROM THE STATES', this.props.userSettings);
    const {
      username,
      createdToday,
      hideProfile,
      privateJournalDefault,
      hideCreatorDefault,
      email,
      phone,
    } = this.props.userSettings;
    return (
      <View>
        <Text>WHAT COMES BACK FROM THE STATE:</Text>
        <Text>USERNAME: {username}</Text>
        <Text>CREATED TODAY: {createdToday ? 'YES' : 'NO'}</Text>
        <Text>HIDE PROFILE: {hideProfile ? 'YES' : 'NO'}</Text>
        <Text>
          PRIVATE JOURNAL DEFAULT: {privateJournalDefault ? 'YES' : 'NO'}
        </Text>
        <Text>HIDE CREATOR DEFAULT: {hideCreatorDefault ? 'YES' : 'NO'}</Text>
        <Text>email: {email}</Text>
        <Text>phone: {phone}</Text>
        <Text>SECURE STORE USERNAME: {this.state.secureStoreUsername}</Text>
        <Text>SECURE STORE PASSWORD: {this.state.secureStorePassword}</Text>
        {this.state.returning && <Text>RETURNING: TRUE</Text>}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userSettings: state.userSettings,
  };
};

export default connect(mapStateToProps)(ReduxInfo);
