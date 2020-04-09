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

  componentDidMount() {
    // console.log('COMPONENT HAS NOW MOUNTED');
    const { today } = this.state;
    this.sanitizeDate(today);
  }

  componentDidUpdate(prevProps) {
    // console.log(
    //   'THESE ARE THE PPROPS TO COMB THROUGH NOW ARENET THEY NOW',
    //   this.props
    // );
    // console.log('PREVPROPS', prevProps);
    if (!prevProps.route.params) {
      prevProps.route.params = { test: 'test' };
    }
    if (
      this.props.route.params &&
      prevProps.route.params.info != this.props.route.params.info
    ) {
      const {
        instructions,
        isoDate,
        chosenGender,
        state,
        county,
      } = this.props.route.params.info;
      // console.log(
      //   'DO THESE EXISTE_@QWOUYKJR_)KG#QC>?>?>?>?>?>??>??',
      //   instructions,
      //   // date,
      //   chosenGender,
      //   state,
      //   county,
      //   isoDate
      // );

      switch (instructions) {
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
          // console.log('AHHHHHHHHHHHHHHHH', this.props.locations);
          this.setState(
            {
              logs: this.props.locations.logs,
            },
            () => {
              if (state && !county) {
                console.log('FILTERING BY STATE');
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

  // defaultDate = () => {
  //   let d = new Date();
  //   console.log('THE NEW DATE', d);
  //   this.sanitizeDate(d);
  // };

  changeDate = (date) => {
    // console.log('THIS IS THE NEW DATE: ', date);
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
      // console.log('THIS IS THE ISO DATE -=-=-=-=-=-=-=', isoDate, tempIso);
      this.sanitizeDate(tempIso);
    }
  };

  sanitizeDate = (dateToLookFor, message) => {
    // console.log('SANITIZE DATE IS NOW GETTING CALLED???????', dateToLookFor);

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
    // console.log('GETTING THE LOGS BY DATE', day, year);
    fetch(`${localSource}/logs/date/${year}/${day}`)
      .then((response) => response.json())
      .then((results) => {
        const states = results.specificDay.map((log) => {
          return log.state;
        });
        // console.log('======STATES', states);
        // console.log('\x1b[93m-About to hit the dispatch-\x1b[39m');
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
        // console.log(
        //   'There has been a problem with your fetch operation: ' + error.message
        // );
        throw error;
      });
  };

  filterByGender = (gender) => {
    if (gender) {
      console.log('\x1b[93m-GENDER HAS BEEN CALLED-\x1b[39m', gender);
      let genderLogs = this.state.filteredLogs.filter((log) => {
        return log.creatorId.gender === gender;
      });

      console.log('\x1b[93m-GENDERLOGS-\x1b[39m', genderLogs);

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
    // console.log('filteredLogs:', this.state.filteredLogs);
    if (this.state.filteredLogs.length < 1) {
      return (
        <View>
          <Text style={{ fontSize: 20, textAlign: 'center', marginTop: '9%' }}>
            No Logs were created on this day...
          </Text>
          {this.state.date.toString().slice(0, 15) ==
            this.state.today.toString().slice(0, 15) && (
            <Text
              style={{ textAlign: 'center', fontSize: 18, color: 'blue' }}
              onPress={() => this.props.nav()}
            >
              Click Here to create one!
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
    // console.log('\x1b[93m-RENDERING THE LOGS-\x1b[39m', item);
    // console.log('\x1b[93m-USERSETTINGS-\x1b[39m', this.props.userSettings);
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
    console.log('DATE', this.state.date.toString().slice(0, 15));
    console.log('TODAY', this.state.today.toString().slice(0, 15));
    let displayDate = this.state.date.toString().slice(0, 15);
    // console.log('ONE', this.state.date.toString().slice(0, 15));
    // console.log('TWO', this.state.today.toString().slice(0, 15));
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
