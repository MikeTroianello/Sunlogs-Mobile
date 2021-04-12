import React, { Component } from 'react';
import { Text, View, FlatList, Button, Picker, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';

import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StackActions, NavigationActions } from 'react-navigation';

import Log from './LogComponent';

import WeatherAudit from '../weather/WeatherAudit';
import StateFilter from '../filterByLocation/StateFilter';
import CountyFilter from '../filterByLocation/CountyFilter';

import { Styles } from '../../styles/MainStyles';

import mockLog from '../../mockLogs/mockLog.json';
import mockLogs from '../../mockLogs/mockLogs.json';
import { ThemeProvider } from 'react-native-elements';

import { localSource } from '../../assets/localSource';

import { setAllLocations, filterByLocation } from '../../redux/ActionCreators/';

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
    setGender: '',
  };

  nav = () => {
    this.props.navigation.navigate(
      'Create Log',
      {},
      NavigationActions.navigate({
        routeName: 'Create Log',
      })
    );
  };

  componentDidMount() {
    const { today } = this.state;
    this.sanitizeDate(today);
  }

  componentDidUpdate(prevProps) {
    let info;
    if (!prevProps.route) {
      return false;
    }
    if (!prevProps.route.params) {
      info = null;
    } else {
      info = prevProps.route.params.info;
    }
    //  else if (this.props.route.params.info == 'created') {
    //   this.sanitizeDate(this.state.today);
    // }
    if (
      this.props.route.params &&
      info != this.props.route.params.info
      // !JSON.stringify(this.props) == JSON.stringify(prevProps)
    ) {

      const {
        instructions,
        isoDate,
        chosenGender,
        state,
        county,
      } = this.props.route.params.info;

      switch (instructions) {
        case 'created':
          this.sanitizeDate(this.state.today);
          break;
        case 'default':
          this.defaultLogs();
          // this.defaultDate();
          break;
        case 'change day':
          this.setState(
            {
              date: isoDate,
              loading: true,
            },
            () => this.sanitizeDate(isoDate)
          );

          // this.defaultDate();
          break;
        case 'filter':
          this.setState(
            {
              logs: this.props.locations.logs,
            },
            () => {
              if (state && !county) {

                this.filterState(state, chosenGender);
              } else if (county) {
                this.filterCounty(county, chosenGender);
              } else if (chosenGender) {
                this.filterByGender(chosenGender);
              }
            }
          );
          break;
        default:
          return false;
          break;
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }


  changeDate = (date) => {

    if (date) {
      this.setState({
        date: date,
      });
      date = date.split('-');
      let b = date.pop();
      date.unshift(b);
      date = date.join('-');
      var isoDate = new Date(`${date}T12:00:00Z`);
      var tempIso = `${date}T12:00:00Z`;
      this.sanitizeDate(tempIso);
    }
  };

  sanitizeDate = (dateToLookFor, message) => {

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

  getLogsByDate = (day, year) => {
    fetch(`${localSource}/logs/date/${year}/${day}`)
      .then((response) => response.json())
      .then((results) => {
        const states = results.specificDay.map((log) => {
          return log.state;
        });
        this.setState(
          {
            logs: results.specificDay,
            filteredLogs: results.specificDay,
            filteredLogsCopy: results.specificDay,
            genderSearchMessage: null,
            yours: results.yours,
            id: results.id,
            states: [...new Set(states)],
            counties: [],
          },
          () => this.props.setAllLocations(this.state.logs, this.state.states)
        );
      })
      .catch((error) => {
        throw error;
      });
  };

  filterByGender = (gender) => {
    if (gender) {
      let genderLogs = this.state.filteredLogs.filter((log) => {
        return log.creatorId.gender === gender;
      });


      this.setState({
        filteredLogs: genderLogs,
        genderSearchMessage: `Showing all ${gender} logs`,
        setGender: gender,
      });
    }
  };

  filterState = (value, gender) => {
    if (value !== 'Filter by State:') {
      this.setState(
        {
          state: value,
        },
        () => {
          this.filterByState(gender);
        }
      );
    }
  };

  filterByState = (gender) => {
    let stateLogs = this.state.logs.filter((log) => {
      return log.state === this.state.state;
    });

    let counties = new Set();

    stateLogs.map((log) => {
      return counties.add(log.county);
    });

    this.setState(
      {
        filteredLogs: stateLogs,
        counties: [...counties],
        genderSearchMessage: null,
      },
      () => this.filterByGender(gender)
    );
  };

  filterCounty = (county, gender) => {
    if (county !== 'Filter by County:') {
      this.setState(
        {
          county: county,
        },
        () => {
          this.filterByCounty(gender);
        }
      );
    }
  };

  filterByCounty = (gender) => {
    let countyLogs = this.state.logs.filter((log) => {
      return log.county === this.state.county;
    });
    this.setState(
      {
        filteredLogs: countyLogs,
        genderSearchMessage: null,
      },
      () => this.filterByGender(gender)
    );
  };

  defaultLogs = () => {
    this.setState({
      states: [],
      counties: [],
      state: undefined,
      stateFiltered: false,
      county: undefined,
      date: new Date(),
    });
    this.sanitizeDate(this.state.today);
  };

  weatherAudit = () => {
    return <WeatherAudit logs={this.state.filteredLogs} />;
  };

  buildList = () => {
    if (this.state.filteredLogs.length < 1) {
      return (
        <View>
          <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '9%' }}>
            No Logs were created on this day...
          </Text>
          {this.state.date.toString().slice(0, 15) ==
            this.state.today.toString().slice(0, 15) && (
            <Text style={{ textAlign: 'center', fontSize: 18 }}>
              Why not create one!
            </Text>
          )}
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.state.filteredLogs}
          renderItem={this.renderLogs}
          keyExtractor={(item) => item._id.toString()}
        />
      );
    }
  };

  renderLogs = ({ item }) => {
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
    let displayDate = this.state.date.toString().slice(0, 15);
    if (
      this.state.date.toString().slice(0, 15) ==
      this.state.today.toString().slice(0, 15)
    ) {
      displayDate = 'today';
    }
    return (
      <ScrollView style={{ backgroundColor: '#e0e7ef' }}>
        <Text style={{ textAlign: 'center', fontSize: 25 }}>
          Logs for {displayDate}:
        </Text>
        {this.state.filteredLogs && this.weatherAudit()}
        {this.state.filteredLogs && this.buildList()}
      </ScrollView>
    );
  }
}

//USE MAP STATE FOR CREATED TODAY ALERT

const mapStateToProps = (state) => {
  return {
    userSettings: state.userSettings,
    locations: state.locations,
  };
};

const mapDispatchToProps = {
  setAllLocations: (logs, states, counties) =>
    setAllLocations(logs, states, counties),
  filterByLocations: (state, county) => filterByLocation(state, county),
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewLogs);
