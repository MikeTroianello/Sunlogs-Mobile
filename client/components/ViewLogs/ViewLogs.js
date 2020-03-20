import React, { Component } from 'react';
import { Text, View, FlatList, Button, Picker, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Log from './LogComponent';

import WeatherAudit from '../weather/WeatherAudit';
import StateFilter from '../filterByLocation/StateFilter';
import CountyFilter from '../filterByLocation/CountyFilter';

import { Styles } from '../../styles/MainStyles';

import mockLog from '../../mockLogs/mockLog.json';
import mockLogs from '../../mockLogs/mockLogs.json';
import { ThemeProvider } from 'react-native-elements';

import { localSource } from '../../assets/localSource';

class ViewLogs extends Component {
  state = {
    today: new Date(),
    date: new Date(),
    logs: null,
    filteredLogs: null,
    filteredLogsCopy: null,
    genderSearchMessage: null,
    yours: false,
    id: null,
    day: null,
    year: null,
    states: [],
    counties: [],
    state: undefined,
    stateFiltered: false,
    county: undefined,
    setGender: ''
  };

  componentDidMount() {
    // console.log('COMPONENT HAS NOW MOUNTED');
    let { today } = this.state;
    this.sanitizeDate(today);
  }

  sanitizeDate = (dateToLookFor, message) => {
    // console.log('SANITIZE DATE IS NOW GETTING CALLED???????');

    var start = new Date(dateToLookFor.getFullYear(), 0, 0);

    var diff =
      dateToLookFor -
      start +
      (start.getTimezoneOffset() - dateToLookFor.getTimezoneOffset()) *
        60 *
        1000;
    var oneDay = 1000 * 60 * 60 * 24;

    var day = Math.floor(diff / oneDay);
    let a = dateToLookFor.toString().split(' ');
    let year = a[3];

    this.getLogsByDate(day, year);
  };

  changeDate = date => {
    if (date) {
      this.setState({
        date: date
      });
      date = date.split('-');
      let b = date.pop();
      date.unshift(b);
      date = date.join('-');
      var isoDate = new Date(`${date}T12:00:00Z`);
      this.sanitizeDate(isoDate);
    }
  };

  getLogsByDate = (day, year) => {
    // console.log('GETTING THE LOGS BY DATE', day, year);
    fetch(`${localSource}/logs/date/${year}/${day}`)
      .then(response => response.json())
      .then(results => {
        const states = results.specificDay.map(log => {
          return log.state;
        });
        console.log('WE HAVE THE RESULTS FOR getLogsByDate: ', results);
        this.setState({
          logs: results.specificDay,
          filteredLogs: results.specificDay,
          filteredLogsCopy: results.specificDay,
          genderSearchMessage: null,
          yours: results.yours,
          id: results.id,
          states: [...new Set(states)],
          counties: []
        });
      })
      .catch(error => {
        // console.log(
        //   'There has been a problem with your fetch operation: ' + error.message
        // );
        throw error;
      });
  };

  filterByGender = gender => {
    // console.log(gender);
    let genderLogs = this.state.filteredLogsCopy.filter(log => {
      return log.creatorId.gender === gender;
    });

    this.setState({
      filteredLogs: genderLogs,
      genderSearchMessage: `Showing all ${gender} logs`,
      setGender: gender
    });
  };

  filterState = value => {
    if (value !== 'Filter by State:') {
      this.setState(
        {
          state: value
        },
        () => {
          this.filterByState();
        }
      );
    }
  };

  filterByState = () => {
    let stateLogs = this.state.logs.filter(log => {
      return log.state === this.state.state;
    });

    let counties = new Set();

    stateLogs.map(log => {
      return counties.add(log.county);
    });

    this.setState({
      filteredLogs: stateLogs,
      counties: [...counties],
      genderSearchMessage: null
    });
  };

  filterCounty = county => {
    if (county !== 'Filter by County:') {
      this.setState(
        {
          county: county
        },
        () => {
          this.filterByCounty();
        }
      );
    }
  };

  filterByCounty = () => {
    let countyLogs = this.state.logs.filter(log => {
      return log.county === this.state.county;
    });
    this.setState(
      {
        filteredLogs: countyLogs,
        genderSearchMessage: null
      },
      () => console.log('THE FILTERED COUNTY LOGS', this.state.filteredLogs)
    );
  };

  defaultLogs = () => {
    this.setState({
      states: [],
      counties: [],
      state: undefined,
      stateFiltered: false,
      county: undefined,
      date: new Date()
    });
    this.sanitizeDate(this.state.today);
  };

  weatherAudit = () => {
    return <WeatherAudit logs={this.state.filteredLogs} />;
  };

  buildList = () => {
    return (
      <FlatList
        data={this.state.filteredLogs}
        renderItem={this.renderLogs}
        keyExtractor={item => item._id.toString()}
      />
    );
  };

  renderLogs = ({ item }) => {
    // console.log('\x1b[93m-RENDERING THE LOGS-\x1b[39m', item);
    console.log('\x1b[93m-USERSETTINGS-\x1b[39m', this.props.userSettings);
    return (
      <View style={Styles.logs}>
        <Log
          log={item}
          passUpName={this.seeProfile}
          id={this.props.userSettings.id}
          privateAccount={item.creatorId.hideProfile}
        />
      </View>
    );
  };

  seeProfile = (username, id) => {
    const { navigate } = this.props.navigation;

    navigate('View Other Profiles', { profileName: username, id: id });
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#e0e7ef' }}>
        <Text style={{ textAlign: 'center', fontSize: 25 }}>
          Logs for today:
        </Text>
        {this.state.filteredLogs && this.weatherAudit()}
        {this.state.filteredLogs && this.buildList()}
      </ScrollView>
    );
  }
}

//USE MAP STATE FOR CREATED TODAY ALERT

const mapStateToProps = state => {
  return {
    userSettings: state.userSettings
  };
};

export default connect(mapStateToProps)(ViewLogs);
