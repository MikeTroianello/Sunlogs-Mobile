import React, { Component } from 'react';
import { Text, View, FlatList, Button, ScrollView } from 'react-native';
import { Styles } from '../../styles/MainStyles';
import { Icon } from 'react-native-elements';

import DatePicker from 'react-native-datepicker';

import WeatherAudit from '../weather/WeatherAudit';

import mockLogs from '../../mockLogs/mockLogs.json';

import { localSource } from '../../assets/localSource';

class ViewOtherProfiles extends Component {
  state = {
    user: null,
    rawLogs: null,
    logs: null,
    moodAvg: [],
    mood: 0,
    name: null,
    oldestFirst: false
  };

  // componentDidMount() {
  //   this.service
  //     .seeUser(this.props.match.params.id)
  //     .then(results => {
  //       this.makeTheLogs(results);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  componentDidMount() {
    console.log(
      'INSIDE VIEW OTHER PROFILES, COMPONENT IS MOUNTING',
      this.props
    );
    this.setItAllUp();
  }

  setItAllUp = async () => {
    const { id } = this.props.route.params;
    fetch(`http:///api/logs/all/${id}`)
      .then(response => response.json())
      .then(results => {
        console.log('SUCCESS', results);

        // this.setState(
        //   {
        //     logs: results.specificDay,
        //     filteredLogs: results.specificDay,
        //     filteredLogsCopy: results.specificDay,
        //     genderSearchMessage: null,
        //     yours: results.yours,
        //     id: results.id,
        //     states: [...new Set(states)],
        //     counties: []
        //   },
        //   () => console.log(this.state)
        // );

        this.makeTheLogs(results, profileSelf);
      })
      .catch(error => {
        console.log(
          'There has been a problem with your fetch operation: ' + error.message
        );
        throw error;
      });

    let profileSelf = false;
    // let results = mockLogs;
    // console.log('RESULTS', results);
    // this.makeTheLogs(results, profileSelf);
  };

  makeTheLogs = results => {
    if (!results || results.length < 1) {
      this.setState({
        logs: <View>They haven't created any logs...</View>
      });
    } else {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let moodArr = [];
      let name;
      let genderIcon;
      let iconSource = 'foundation';

      let theLogs = results.map((log, key) => {
        switch (log.creatorId.gender) {
          case 'male':
            genderIcon = 'male-symbol';
            break;
          case 'female':
            genderIcon = 'female-symbol';
            break;
          default:
            genderIcon = 'genderless';
            iconSource = 'font-awesome';
            break;
        }

        let weatherString;
        if (!name) name = log.creatorId.username;
        moodArr.push(log.mood);
        if (log.weatherIcon) {
          weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon.slice(
            0,
            -1
          )}d@2x.png`;
        } else weatherString = '';

        return (
          <View key={key} className='log'>
            <View className='profile-log-head'>
              <View>
                <Text>
                  {log.month} {log.dayOfMonth}, {log.year}
                </Text>
                <Text>
                  {log.county}, {log.state}
                </Text>
              </View>
              <View className='weather-box weather-box-profile'>
                {/* <img
                    className='weather-icon'
                    src={weatherString}
                    alt={log.weatherType}
                  /> */}

                <Text> {log.weatherType}</Text>
              </View>
            </View>

            <View className='mood-and-productivity'>
              <Text>
                Mood: <Text>{log.mood}</Text>
              </Text>
              <Text>
                Productivity: <Text>{log.productivity}</Text>
              </Text>
            </View>
            <Text>Log: {log.journal}</Text>
          </View>
        );
      });
      let mood =
        Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;

      this.setState({
        rawLogs: results,
        logs: theLogs,
        mood: mood,
        name: name,
        gender: genderIcon,
        iconSource
      });
    }
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
      prevState => ({
        oldestFirst: !prevState.oldestFirst
      }),
      this.makeTheLogs(sortedLogs)
    );
  };

  sortByAge = () => {
    this.setState(prevProps => ({
      oldestFirst: !prevProps.oldestFirst
    }));
  };

  render() {
    console.log('rendering', this.props.route.params);
    const { profileName } = this.props.route.params;
    console.log('THIIS ', this.props.route.params);

    return (
      <View className='top-push'>
        <Text>This is {profileName}'s page</Text>
        <View className='profile-mood-box'>
          <Text className='view-profile-overall-happiness'>
            {profileName}'s Overall Happiness: {this.state.mood}
          </Text>
          <Icon name={this.state.gender} type={this.state.iconSource} />
          {this.state.logs && <WeatherAudit logs={this.state.rawLogs} />}
        </View>
        <Button
          title={`Show ${this.state.oldestFirst ? 'oldest' : 'newest'} first`}
          onClick={this.sortByAge}
        />

        <View className='log-box'>{this.state.logs}</View>
      </View>
    );
  }
}

export default ViewOtherProfiles;
