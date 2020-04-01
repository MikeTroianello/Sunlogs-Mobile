import React, { Component } from 'react';

import { connect } from 'react-redux';

import MainNavigator from './MainNavigatorComponent';
import Login from './account/LoginComponent';

class NavigationParentComponent extends Component {
  render() {
    console.log('THERE IS NO CHALK ONLY ZOOL ', this.props.userSettings);
    console.log('ALL DA PROPS', this.props);
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
