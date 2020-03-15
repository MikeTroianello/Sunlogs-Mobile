import * as ActionTypes from './ActionTypes';
import { localSource } from '../assets/localSource';

export const loggedIn = () => dispatch => {
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
      console.log('\x1b[93m-SUCCESS-\x1b[39m');
      console.log(results);
      dispatch(setLoggedIn(results));
    })
    .catch(error => {
      this.setState({
        message: `Username already exists!`
      });
    });
};

export const setLoggedIn = info => ({
  type: ActionTypes.LOG_IN,
  payload: info
});

export const setCreatedToday = () => ({
  type: ActionTypes.CREATED_TODAY
});

export const updateSettings = info => ({
  type: ActionTypes.UPDATE_SETTINGS,
  payload: info
});

export const logout = () => ({
  type: ActionTypes.LOG_OUT
});

export const deleteUser = () => ({
  type: ActionTypes.DELETE_USER
});