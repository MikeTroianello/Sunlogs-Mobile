import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Test extends Component {
  state = {
    fetchMsg: 'fetching...'
  };

  componentDidMount() {
    console.log('INSIDE TEST');
    fetch('http://IP.ADDRESS/test')
      .then(response => response.json())
      .then(responseJson => {
        console.log('blsh', responseJson.message);
        this.setState({
          fetchMsg: responseJson.message
        });
      })
      .catch(function(error) {
        console.log(
          'There has been a problem with your fetch operation: ' + error.message
        );
        throw error;
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>TEST</Text>
        <Text>{this.state.fetchMsg}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
