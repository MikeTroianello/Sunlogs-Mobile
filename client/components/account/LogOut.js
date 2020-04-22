import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../redux/ActionCreators';

import { localSource } from '../../assets/localSource';

class Logout extends Component {
  componentDidMount() {
    const { navigate } = this.props.navigation;
    console.log('ATTEMPTING TO LOG OUT');
    fetch(`${localSource}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    })
      .then((response) => response.json())
      .then((results) => {
        // this.props.logIt(results);

        console.log(results);
        this.props.logout();
      })
      .catch((error) => {
        this.setState({
          message: `FAILURE!`,
        });
      });
  }

  render() {
    return <View></View>;
  }
}

const mapDispatchToProps = {
  logout: () => logout(),
};

export default connect(null, mapDispatchToProps)(Logout);
