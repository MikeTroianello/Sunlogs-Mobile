import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { userSettings } from './userSettings';
// import { locations } from './locations';

// import { persistStore, persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/es/storage';
// // import { AsyncStorage } from 'react-native';

// const config = {
//   key: 'root',
//   storage,
//   debug: true,
// };

// export const ConfigureStore = () => {
//   const store = createStore(
//     persistCombineReducers(config, {
//       userSettings
//     }),
//     applyMiddleware(thunk, logger)
//   );

// export const ConfigureStore = () => {
//   const store = createStore(
//     combineReducers({
//       userSettings,
//       locations,
//     }),
//     applyMiddleware(thunk, logger)
//   );

//   // const persistor = persistStore(store);

//   return store;
// };

// export const ConfigureStore = () => {
//   const store = createStore(
//     persistCombineReducers(config, {
//       userSettings,
//       locations,
//     }),
//     applyMiddleware(thunk, logger)
//   );

//   const persistor = persistStore(store);

//   return { persistor, store };
// };

//NEW
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const config = {
  key: 'root',
  storage,
  debug: true,
};

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      userSettings,
    }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
