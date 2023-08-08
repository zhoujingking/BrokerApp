import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppModules } from '../modules';

const Stack = createNativeStackNavigator();

function Router(props) {
  console.log(AppModules)
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        {
          AppModules.map(module => (
            <Stack.Screen
              name={module.name}
              component={module.component}
              key={module.name}
            />
          ))
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
Router.defaultProps = {};
Router.propTypes = {};
export default Router;