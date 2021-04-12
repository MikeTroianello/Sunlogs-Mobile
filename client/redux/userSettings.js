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
    token: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.RETURNING:
      return {
        ...state,
        returning: true,
      };
    // case ActionTypes.LOG_IN:
    //   return {
    //     ...state,
    //     username: action.payload.username,
    //     id: action.payload._id,
    //     createdToday: action.payload.createdToday,
    //     hideProfile: action.payload.hideProfile,
    //     privateJournalDefault: action.payload.privateJournalDefault,
    //     hideCreatorDefault: action.payload.hideCreatorDefault,
    //     email: action.payload.email,
    //     phone: action.payload.phone,
    //   };
    case ActionTypes.LOG_IN:
      return {
        ...state,
        username: action.payload.user.username,
        id: action.payload.user._id,
        createdToday: action.payload.user.createdToday,
        hideProfile: action.payload.user.hideProfile,
        privateJournalDefault: action.payload.user.privateJournalDefault,
        hideCreatorDefault: action.payload.user.hideCreatorDefault,
        email: action.payload.user.email,
        phone: action.payload.user.phone,
        token: action.payload.token
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
        token: null
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
        token: null
      };

    default:
      return state;
  }
};
