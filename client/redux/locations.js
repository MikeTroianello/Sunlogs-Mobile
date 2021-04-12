import * as ActionTypes from './ActionTypes';

export const locations = (
  state = {
    states: null,
    counties: null,
    state: null,
    county: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_ALL_LOCATIONS:
      return {
        logs: action.payload.logs,
        states: action.payload.states,
        counties: action.payload.counties,
      };
    case ActionTypes.CHOOSE_STATE:
      return {};
    case ActionTypes.CHOOSE_COUNTY:
      return {};

    default:
      return state;
  }
};
