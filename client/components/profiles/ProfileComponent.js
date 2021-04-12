import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import WeatherAudit from '../weather/WeatherAudit';
import Log from '../ViewLogs/LogComponent';
import LoadingLogs from '../LoadingLogs';

import { Styles } from '../../styles/MainStyles';
import { profileStyle } from '../../styles/ProfileStyles';

import { localSource } from '../../assets/localSource';

class Profile extends Component {
  state = {
    user: null,
    rawLogs: null,
    logs: null,
    moodAvg: [],
    mood: null,
    notToday: false,
    block: false,
    oldestFirst: false,
    profileHeader: '',
    happinessHeader: '',
    elipses: '',
  };

  componentDidMount = () => {
    this.setItAllUp();
  };

  setItAllUp = async () => {
    fetch(`${localSource}/logs/all/my-posts`,
    {headers: {
      'x-auth-token': this.props.userSettings.token
    }})
      .then((response) => response.json())
      .then((results) => {
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;
        let moodArr = [];

        results.map((log) => {
          moodArr.push(log.mood);
        });

        let mood =
          Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;

        this.setState({
          logs: results,
          mood: mood,
        });
      })
      .catch((error) => {
        this.setState({
          message: `Username already exists!`,
        });
      });
  };

  // makeTheLogs = (results, profileSelf) => {
  //   let today = new Date();
  //   var start = new Date(today.getFullYear(), 0, 0);
  //   var diff =
  //     today -
  //     start +
  //     (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
  //   var oneDay = 1000 * 60 * 60 * 24;
  //   let a = today.toString().split(' ');
  //   var day = Math.floor(diff / oneDay);
  //   let year = a[3];

  //   const reducer = (accumulator, currentValue) => accumulator + currentValue;
  //   let moodArr = [];

  //   let name;

  //   moodArr.push(log.mood);
  //   let weatherString;

  //   weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon.slice(
  //     0,
  //     -1
  //   )}d@2x.png`;
  // };

  sortByAge = () => {
    let sortedLogs;
    if (this.state.oldestFirst) {
      sortedLogs = this.state.logs.sort((a, b) => (a.year > b.year ? 1 : -1));
      sortedLogs = this.state.logs.sort((a, b) =>
        a.dayOfYear > b.dayOfYear ? 1 : -1
      );
    } else {
      sortedLogs = this.state.logs.sort((a, b) => (a.year < b.year ? 1 : -1));
      sortedLogs = this.state.logs.sort((a, b) =>
        a.dayOfYear < b.dayOfYear ? 1 : -1
      );
    }
    this.setState((prevProps) => ({
      oldestFirst: !prevProps.oldestFirst,
      logs: sortedLogs,
    }));
  };

  renderLogs = ({ item }) => {
    return (
      <View style={Styles.logs}>
        <Log
          log={item}
          id={this.props.userSettings.id}
          privateAccount={item.creatorId.hideProfile}
          profile={true}
        />
      </View>
    );
  };

  buildList = () => {
    return (
      <FlatList
        data={this.state.logs}
        renderItem={this.renderLogs}
        keyExtractor={(blah) => blah._id.toString()}
      />
    );
  };

  create = () => {
    const { navigate } = this.props.navigation;
    navigate('Create Log');
  };

  render() {
    if (!this.state.logs) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#e0e7ef',
            width: '100%',
            height: '100%',
          }}
        >
          <LoadingLogs />
          <Text style={{ textAlign: 'center', fontSize: 26 }}>
            Loading your profile
          </Text>
        </View>
      );
    }

    else {
      return (
        <ScrollView style={{ backgroundColor: '#e0e7ef' }}>
          <View className='top-push'>
            {!this.props.userSettings.createdToday && (
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  marginBottom: '5%',
                }}
              >
                You have not created a mood log today.{' \n'}
                <Text onPress={this.create} style={{ color: 'blue' }}>
                  Create one now!
                </Text>
              </Text>
            )}
            <View className='profile-mood-box'>
              <Text style={{ textAlign: 'center', fontSize: 18 }}>
                Your Overall Happiness: {this.state.mood}
              </Text>
            </View>
            {this.state.logs && !this.state.block && (
              <WeatherAudit logs={this.state.logs} />
            )}

            <View style={profileStyle.sortButton}>
              <Button
                title={`Show ${
                  this.state.oldestFirst ? 'oldest' : 'newest'
                } first`}
                onPress={this.sortByAge}
                buttonStyle={{
                  backgroundColor: '#5694DB',
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#413F41',
                }}
              />
            </View>
            {this.state.logs && this.buildList()}
          </View>
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userSettings: state.userSettings,
  };
};

export default connect(mapStateToProps)(Profile);
