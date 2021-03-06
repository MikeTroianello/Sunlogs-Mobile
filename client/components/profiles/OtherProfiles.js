import React, { Component } from 'react';
import { Text, View, FlatList, Button, ScrollView } from 'react-native';
import { Styles } from '../../styles/MainStyles';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';

import WeatherAudit from '../weather/WeatherAudit';
import Log from '../ViewLogs/LogComponent';

import { localSource } from '../../assets/localSource';

class OtherProfile extends Component {
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
    happinessHeader: ''
  };

  sortByAge = () => {
    let sortedLogs;
    if (this.state.oldestFirst) {
      sortedLogs = this.state.rawLogs.sort((a, b) =>
        a.year > b.year ? 1 : -1
      );
      sortedLogs = this.state.rawLogs.sort((a, b) =>
        a.dayOfYear > b.dayOfYear ? 1 : -1
      );
    } else {
      sortedLogs = this.state.rawLogs.sort((a, b) =>
        a.year < b.year ? 1 : -1
      );
      sortedLogs = this.state.rawLogs.sort((a, b) =>
        a.dayOfYear < b.dayOfYear ? 1 : -1
      );
    }
    this.setState(
      prevProps => ({
        oldestFirst: !prevProps.oldestFirst
      }),
      this.makeTheLogs(sortedLogs, true)
    );
  };

  componentDidMount = () => {
    this.setItAllUp();
  };

  setItAllUp = async () => {
    profileSelf = true;
    fetch(`${localSource}/logs/all/my-posts`,{headers: {
      'x-auth-token': this.props.userSettings.token
    }},)
      .then(response => response.json())
      .then(results => {
        this.makeTheLogs(results, profileSelf);
      })
      .catch(error => {
        this.setState({
          message: `Username already exists!`
        });
      });
  };

  makeTheLogs = (results, profileSelf) => {
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

    if (results.length < 1 && profileSelf) {
      this.setState({
        logs: (
          <View className='no-log-created'>
            <Text>
              You haven't created a log yet!
              <Text onPress={navigate('Create Log')} style={{ color: 'blue' }}>
                Create one now!
              </Text>{' '}
            </Text>
            <Link to='/create'>Make one now!</Link>
          </View>
        ),
        block: true
      });
    } else if (results.length < 1) {
      this.setState({
        logs: <View>They haven't created any logs...</View>
      });
    } else {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let moodArr = [];

      let name;
      let genderIcon;

      let theLogs = results.map((log, key) => {
        moodArr.push(log.mood);
        let weatherString;
        if (log.weatherIcon) {
          weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon.slice(
            0,
            -1
          )}d@2x.png`;
        } else weatherString = '';
        return (
          <View key={key} style={Styles.log}>
            <View className='profile-log-head'>
              <Text>
                {log.month} {log.dayOfMonth}, {log.year}
              </Text>
              <Text>
                {log.county} County, {log.state}
              </Text>
            </View>
            <View className='weather-box weather-box-profile'>
              <Text>
                {/* <img
                    className='weather-icon'
                    src={weatherString}
                    alt={log.weatherType}
                  /> */}
              </Text>
              <Text> {log.weatherType}</Text>
            </View>

            <View className='mood-and-productivity'>
              <Text>Mood: {log.mood}</Text>
              <Text>
                Productivity: <Text>{log.productivity}</Text>
              </Text>
            </View>
            <Text>Log: {log.journal}</Text>
            {profileSelf && log.hideCreator && (
              <Text>You have hidden your name for this log</Text>
            )}
            {profileSelf && log.privateJournal && (
              <Text>You have hidden this journal from public viewing</Text>
            )}
          </View>
        );
      });
      let mood =
        Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;

      if (profileSelf) {
        this.setState({
          rawLogs: results,
          logs: theLogs,
          mood: mood,
          profileHeader: 'Your Profile Page',
          happinessHeader: 'Overall Happiness: '
        });
        let dailyLog = results.filter(log => {
          return log.dayOfYear === day && log.year === Number(year);
        });
        if (dailyLog.length < 1) {
          this.setState({
            notToday: true
          });
        }
      } else {
        this.setState({
          rawLogs: results,
          logs: theLogs,
          mood: mood,
          name: name,
          gender: genderIcon,
          profileHeader: `this is ${name}'s page`,
          happinessHeader: `${name}'s Overall Happiness: '`
        });
      }
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View className='top-push'>
          {this.state.notToday && (
            <Text>
              You have not created a mood log today.{' '}
              <Text onPress={navigate('Create Log')} style={{ color: 'blue' }}>
                Create one now!
              </Text>{' '}
            </Text>
          )}
          <View className='profile-mood-box'>
            <Text className='view-profile-overall-happiness'>
              Your Overall Happiness: {this.state.mood}
            </Text>
          </View>
          {this.state.logs && !this.state.block && (
            <WeatherAudit logs={this.state.rawLogs} />
          )}

          <View className='sort-by-age-box'>
            <Button
              onPress={this.sortByAge}
              title={`Show ${
                this.state.oldestFirst ? 'oldest' : 'newest'
              } first`}
            />
          </View>
          <View className='log-box'>{this.state.logs}</View>
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

export default connect(mapStateToProps)(OtherProfile);
