import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { localSource } from '../assets/localSource';

export default class Test extends Component {
  componentDidMount() {
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

    fetch(`${localSource}/loggedIn/${day}/${year}`)
      .then(response => response.json())
      .then(results => {
        // this.props.logIt(results);
        console.log('SUCCESS');
        console.log(results);
      })
      .catch(error => {
        this.setState({
          message: `Username already exists!`
        });
      });
  }

  render() {
    return (
      <View>
        <Text>TEST</Text>
        <View style={styles.iconBox}>
          <Icon
            name='cart-plus'
            type='font-awesome'
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
          <Icon
            name='user'
            type='font-awesome'
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  stackIcon: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    color: 'black',
    fontSize: 24
  }
});
