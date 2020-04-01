import React from 'react';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import MainNavigator from './components/MainNavigatorComponent';
import NavigationParent from './components/NavigationParentComponent';

const initialState = {};

const store = ConfigureStore(initialState);

export default function App() {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
