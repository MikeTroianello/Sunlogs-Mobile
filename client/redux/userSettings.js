import * as ActionTypes from './ActionTypes';

export const userSettings = (
  state = {
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
    case ActionTypes.LOG_IN:
      console.log('ACTIoN DOT PAYLOAD', action.payload);
      return {
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
      console.log('YOU HAVE NOW CREATED TODAY!!!!!!!!!!!!!');
      return {
        createdToday: true,
        ...state,
      };
    case ActionTypes.UPDATE_SETTINGS:
      console.log('THESE ARE THE SETTINGS IN THE PAYLOAD', action.payload);
      return {
        username: action.payload.username,
        createdToday: action.payload.createdToday,
        hideProfile: action.payload.hideProfile,
        privateJournalDefault: action.payload.privateJournalDefault,
        hideCreatorDefault: action.payload.hideCreatorDefault,
        ...state,
      };
    case ActionTypes.LOG_OUT:
      console.log('LOGGGING OUT ');
      return {
        username: null,
        createdToday: false,
        hideProfile: false,
        privateJournalDefault: false,
        hideCreatorDefault: false,
      };
    case ActionTypes.DELETE_USER:
      return {
        username: null,
        createdToday: false,
        hideProfile: false,
        privateJournalDefault: false,
        hideCreatorDefault: false,
      };

    default:
      return state;
  }
};
