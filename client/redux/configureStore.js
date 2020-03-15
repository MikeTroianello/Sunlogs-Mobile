import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { persistStore, persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/es/storage';

import { userSettings } from './userSettings';

// const config = {
//   key: 'root',
//   storage,
//   debug: true
// };

// export const ConfigureStore = () => {
//   const store = createStore(
//     persistCombineReducers(config, {
//       userSettings
//     }),
//     applyMiddleware(thunk, logger)
//   );

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      userSettings
    }),
    applyMiddleware(thunk, logger)
  );

  // const persistor = persistStore(store);

  return store;
};