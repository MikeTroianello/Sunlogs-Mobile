import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  Picker,
  ScrollView,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';

import Log from './LogComponent';
import LoadingLogs from '../LoadingLogs';

import WeatherAudit from '../weather/WeatherAudit';
import FilterLog from './FilterLogComponent';

import { Styles } from '../../styles/MainStyles';

import { localSource } from '../../assets/localSource';

import { setAllLocations, filterByLocation } from '../../redux/ActionCreators/';

class ViewLogsComponent extends Component {
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
    showModal: false,
  };

  // nav = () => {
  //   this.props.navigation.navigate(
  //     'Create Log',
  //     {},
  //     NavigationActions.navigate({
  //       routeName: 'Create Log',
  //     })
  //   );
  // };

  componentDidMount() {
    const { today } = this.state;
    this.sanitizeDate(today);
  }

  componentDidUpdate(prevProps) {

    let info;
    if (!prevProps.route || !this.props.route.params) {
      return false;
    }
    if (!prevProps.route.params) {
      info = null;
    } else {
      info = prevProps.route.params.info;
    }
    if (this.props.route.params.info !== info) {
      this.sanitizeDate(this.state.today);
    }
  }

  filter = (info) => {
    const { state, county, chosenGender } = info;
    if (state && !county) {
      this.filterState(state, chosenGender);
    } else if (county) {
      this.filterCounty(county, chosenGender);
    } else if (chosenGender) {
      this.filterByGender(chosenGender);
    }
  };

  changeDate = (date) => {
    this.toggleModal();
    if (date) {
      this.setState(
        {
          date: date,
          filteredLogs: null,
        },
        () => this.sanitizeDate(this.state.date)
      );
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
      let genderLogs = this.state.logs.filter((log) => {
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

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
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
            <Text
              style={{ textAlign: 'center', fontSize: 18, color: 'blue' }}
              onPress={() => this.props.navigation.navigate('Create Log')}
            >
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

    if (!this.state.filteredLogs) {
      return (
        <View>
          <Text
            style={{ textAlign: 'center', fontSize: 25, marginBottom: '10%' }}
          >
            Logs for {displayDate}:
          </Text>
          <LoadingLogs />
        </View>
      );
    } else {
      return (
        <ScrollView style={{ backgroundColor: '#e0e7ef' }}>
          <Text style={{ textAlign: 'center', fontSize: 25 }}>
            Logs for {displayDate}:
          </Text>
          <Button title='Filter Logs' onPress={this.toggleModal} />
          {this.state.filteredLogs && this.weatherAudit()}
          {this.state.filteredLogs && this.buildList()}
          <Modal
            style={{ color: '#e0e7ef' }}
            animationType='slide'
            visible={this.state.showModal}
          >
            <View style={{ color: '#e0e7ef' }}>
              <FilterLog
                toggleModal={this.toggleModal}
                defaultLogs={this.defaultLogs}
                filter={this.filter}
                changeDate={this.changeDate}
                date={this.state.date}
                sanitizeDate={this.sanitizeDate}
              />
            </View>
          </Modal>
        </ScrollView>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewLogsComponent);
