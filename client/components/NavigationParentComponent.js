import React, { Component } from 'react';

import { connect } from 'react-redux';

import MainNavigator from './MainNavigatorComponent';
import Login from './account/LoginComponent';

class NavigationParentComponent extends Component {
  render() {
    if (this.props.usernamme) return <MainNavigator />;
    else return <Login />;
  }
}

const mapStateToProps = state => {
  return {
    userSettings: state.userSettings
  };
};

export default connect(mapStateToProps)(NavigationParentComponent);
