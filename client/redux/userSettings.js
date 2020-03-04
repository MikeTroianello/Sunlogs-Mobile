import * as ActionTypes from './ActionTypes';

export const userSettings = (
  state = {
    username: null,
    createdToday: false,
    hideProfile: false,
    privateJournalDefault: false,
    hideCreatorDefault: false
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return {
        username: action.payload.username,
        createdToday: action.payload.createdToday,
        hideProfile: action.payload.hideProfile,
        privateJournalDefault: action.payload.privateJournalDefault,
        hideCreatorDefault: action.payload.hideCreatorDefault
      };
    case ActionTypes.CREATED_TODAY:
      return {
        createdToday: true
      };
    case ActionTypes.UPDATE_SETTINGS:
      console.log('THESE ARE THE SETTINGS IN THE PAYLOAD', action.payload);
      return {
        username: action.payload.username,
        createdToday: action.payload.createdToday,
        hideProfile: action.payload.hideProfile,
        privateJournalDefault: action.payload.privateJournalDefault,
        hideCreatorDefault: action.payload.hideCreatorDefault
      };
    case ActionTypes.LOG_OUT:
      return {
        username: null,
        createdToday: false,
        hideProfile: false,
        privateJournalDefault: false,
        hideCreatorDefault: false
      };
    case ActionTypes.DELETE_USER:
      return {
        username: null,
        createdToday: false,
        hideProfile: false,
        privateJournalDefault: false,
        hideCreatorDefault: false
      };

    default:
      return state;
  }
};
