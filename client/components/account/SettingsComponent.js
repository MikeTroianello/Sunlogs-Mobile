import React, { Component } from 'react';
import {
  Text,
  View,
  Switch,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Input } from 'react-native-elements';
import { Styles, SettingsCss } from '../../styles/MainStyles';
import { connect } from 'react-redux';

import { updateSettings, deleteUser } from '../../redux/ActionCreators';

import { localSource } from '../../assets/localSource';

import * as SecureStore from 'expo-secure-store';

class Settings extends Component {
  state = {
    message: null,
    hideProfile: this.props.userSettings.hideProfile,
    privateJournalDefault: this.props.userSettings.privateJournalDefault,
    hideCreatorDefault: this.props.userSettings.hideCreatorDefault,
    oldPhone: this.props.userSettings.phone,
    phone: null,
    oldEmail: this.props.userSettings.email,
    email: null,
    oldPass: null,
    newPass: null,
    confirmation: null,
    deletePassword: null,
    id: null,
  };

  handleChange = (text, statePiece) => {
    this.setState(
      {
        [statePiece]: text,
      }
    );
  };

  toggle = (statePiece) => {
    this.setState(
      (prevState) => ({
        [statePiece]: !prevState[statePiece],
      })
    );
  };

  changeInfo = () => {
    const info = this.state;
    fetch(`${localSource}/change-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.props.userSettings.token
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((results) => {
        this.props.updateSettings(info);
        Alert.alert(
          '',
          'Settings changed!',
          [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('See Logs'),
            },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        this.setState({
          message: `Something went wrong`,
        });
      });
  };

  deleteUser = () => {
    const { navigate } = this.props.navigation;
    navigate('Delete Profile');
  };

  render() {
    return (
      <ScrollView alwaysBounceVertical={true}>
        <View className='settings'>
          <View className='settings-change-preferences'>
            <View style={SettingsCss.preferences}>
              <View>
                <Text style={SettingsCss.settingHeader}>Hide your profile</Text>

                <Text className={this.state.hideProfile ? 'red' : 'green'}>
                  You {this.state.hideProfile === true && <Text>DO NOT </Text>}
                  allow others to view your profile
                </Text>
              </View>
              <Switch
                value={this.state.hideProfile}
                name='hideProfile'
                onValueChange={() => this.toggle('hideProfile')}
              />
            </View>
            <View style={SettingsCss.preferences}>
              <View>
                <Text style={SettingsCss.settingHeader}>
                  Make Journals Private by Default
                </Text>
                <Text
                  className={this.state.privateJournalDefault ? 'red' : 'green'}
                >
                  Your Journals are{' '}
                  {this.state.privateJournalDefault ? 'HIDDEN' : 'shown'} by
                  default
                </Text>
              </View>
              <Switch
                value={this.state.privateJournalDefault}
                name='privateJournalDefault'
                onValueChange={() => this.toggle('privateJournalDefault')}
              />
            </View>
            <View style={SettingsCss.preferences}>
              <View>
                <Text style={SettingsCss.settingHeader}>
                  Hide your name by Default
                </Text>
                <Text>
                  Your name is{' '}
                  {this.state.hideCreatorDefault ? 'HIDDEN' : 'shown'} by
                  default
                </Text>
              </View>
              <Switch
                value={this.state.hideCreatorDefault}
                name='hideCreatorDefault'
                onValueChange={() => this.toggle('hideCreatorDefault')}
              />
            </View>
          </View>
          <View>
            <View>
              <Text style={SettingsCss.settingHeaderTwo}>Change Phone # </Text>
              <Input
                type='tel'
                autoComplete='off'
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                name='phone'
                placeholder={this.state.oldPhone || '+3(141)592-6535'}
                onChangeText={(text) => this.handleChange(text, 'phone')}
              />
            </View>

            <View>
              <Text style={SettingsCss.settingHeaderTwo}>Change email</Text>
              <Input
                type='email'
                name='email'
                autoComplete='off'
                placeholder={this.state.oldEmail || 'name@email.com'}
                onChangeText={(text) => this.handleChange(text, 'email')}
              />
            </View>

            <View>
              <View>
                <View>
                  <View>
                    <Text style={SettingsCss.settingHeaderTwo}>
                      Change Password
                    </Text>
                    <Input
                      type='password'
                      name='oldPass'
                      autoComplete='off'
                      placeholder='********'
                      onChangeText={(text) =>
                        this.handleChange(text, 'oldPass')
                      }
                    />
                  </View>

                  <View>
                    <Text style={SettingsCss.settingHeaderTwo}>
                      Confirm Password
                    </Text>
                    <Input
                      type='password'
                      name='newPass'
                      autoComplete='off'
                      placeholder='********'
                      onChangeText={(text) =>
                        this.handleChange(text, 'newPass')
                      }
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 15 }}>
              <Button title='Change Settings' onPress={this.changeInfo} />
            </View>
          </View>

          {/* <Button title='DELETE' onPress={this.deleteUser} /> */}
          <TouchableOpacity
            onPress={this.deleteUser}
            style={SettingsCss.deleteTouchableOpacity}
          >
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              DELETE USER
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userSettings: state.userSettings,
  };
};

const mapDispatchToProps = {
  updateSettings: (info) => updateSettings(info),
  deleteUser: () => deleteUser(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
