import * as ActionTypes from './ActionTypes';

export const userSettings = (
  state = {
    returning: false,
    username: null,
    createdToday: false,
    hideProfile: false,
    privateJournalDefault: false,
    hideCreatorDefault: false,
    email: null,
    phone: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.RETURNING:
      return {
        ...state,
        returning: true,
      };
    case ActionTypes.LOG_IN:
      return {
        ...state,
        username: action.payload.username,
        id: action.payload._id,
        createdToday: action.payload.createdToday,
        hideProfile: action.payload.hideProfile,
        privateJournalDefault: action.payload.privateJournalDefault,
        hideCreatorDefault: action.payload.hideCreatorDefault,
        email: action.payload.email,
        phone: action.payload.phone,
      };
    case ActionTypes.CREATED_TODAY:
      return {
        ...state,
        createdToday: true,
      };
    case ActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        username: action.payload.username,
        createdToday: action.payload.createdToday,
        hideProfile: action.payload.hideProfile,
        privateJournalDefault: action.payload.privateJournalDefault,
        hideCreatorDefault: action.payload.hideCreatorDefault,
      };
    case ActionTypes.LOG_OUT:
      return {
        ...state,
        username: null,
        createdToday: false,
        hideProfile: false,
        privateJournalDefault: false,
        hideCreatorDefault: false,
        email: null,
        phone: null,
      };
    case ActionTypes.DELETE_USER:
      return {
        ...state,
        username: null,
        createdToday: false,
        hideProfile: false,
        privateJournalDefault: false,
        hideCreatorDefault: false,
        email: null,
        phone: null,
      };

    default:
      return state;
  }
};
