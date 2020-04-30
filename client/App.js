import React from 'react';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import MainNavigator from './components/MainNavigatorComponent';
import LoadingPage from './components/LoadingPage';

import { PersistGate } from 'redux-persist/es/integration/react';

const initialState = {};

// const store = ConfigureStore(initialState);
const { persistor, store } = ConfigureStore();

// export default function App() {
//   console.disableYellowBox = true;
//   return (
//     <Provider store={store}>
//       <MainNavigator />
//     </Provider>
//   );
// }

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
