import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {theme} from './src/themes';
import {RootNavigator} from './src/navigations';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <RootNavigator />
      </NativeBaseProvider>
    </Provider>
  );
}
