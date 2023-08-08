import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './pages/Main';
import Profile from './pages/Profile';

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator 
      backBehavior="history"
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default {
  name: 'Home',
  component: Home,
};
