import React, { Component } from 'react';
import { Text, View, FlatList, Button, ScrollView } from 'react-native';
import { Styles } from '../../styles/MainStyles';
import DatePicker from 'react-native-datepicker';

import WeatherAudit from '../weather/WeatherAudit';
import Log from '../ViewLogs/LogComponent';

import { localSource } from '../../assets/localSource';

import { connect } from 'react-redux';

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
    happinessHeader: ''
  };

  componentDidMount = () => {
    this.setItAllUp();
  };

  setItAllUp = async () => {
    // let { profileSelf } = this.props;

    // let results;
    fetch(`${localSource}/logs/all/my-posts`)
      .then(response => response.json())
      .then(results => {
        // this.props.logIt(results);
        // this.makeTheLogs(results, true);
        this.setState({
          logs: results
        });
      })
      .catch(error => {
        this.setState({
          message: `Username already exists!`
        });
      });

    // let results = mockLogs;
  };

  makeTheLogs = (results, profileSelf) => {
    console.log(
      'making the logs0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-=0-=0-=0-=0-=0-=0-=0=-',
      results
    );
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

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let moodArr = [];

    let name;

    moodArr.push(log.mood);
    let weatherString;

    weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon.slice(
      0,
      -1
    )}d@2x.png`;
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

  renderLogs = ({ item }) => {
    console.log('\x1b[93m-RENDERING THE LOGS-\x1b[39m', item);
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
        keyExtractor={item => item._id.toString()}
      />
    );
  };

  create = () => {
    const { navigate } = this.props.navigation;
    navigate('Create Log');
  };

  render() {
    console.log('\x1b[93m-STATE LOGS-\x1b[39m', this.state.logs);
    return (
      <ScrollView>
        <View className='top-push'>
          {this.state.notToday && (
            <Text>
              You have not created a mood log today.{' '}
              <Text onPress={this.create} style={{ color: 'blue' }}>
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
          {/* <View className='log-box'>{this.state.logs}</View> */}
          {this.state.logs && this.buildList()}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userSettings: state.userSettings
  };
};

export default connect(mapStateToProps)(Profile);
