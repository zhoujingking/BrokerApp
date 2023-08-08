import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Router from './src/router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(props) {
  return (
    <SafeAreaProvider>
      <Router />
    </SafeAreaProvider>
  );
}
App.defaultProps={};
App.propTypes={};
export default App;