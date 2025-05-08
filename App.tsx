import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { RootStackNavigator } from './src/navigation';
import { Provider } from 'react-redux';
import {store} from './src/redux/store/store'

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </Provider>

  );
}

export default App;
