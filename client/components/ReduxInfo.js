import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { loggedIn } from '../redux/ActionCreators';

import { styles } from '../styles/MainStyles';

const mapStateToProps = state => {
  return {
    userSettings: state.userSettings
  };
};

class ReduxInfo extends Component {
  render() {
    console.log('WHaT WE MAPPED FROM THE STATES', this.props.userSettings);
    const {
      username,
      createdToday,
      hideProfile,
      privateJournalDefault,
      hideCreatorDefault,
      email,
      phone
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
      </View>
    );
  }
}

export default connect(mapStateToProps)(ReduxInfo);
