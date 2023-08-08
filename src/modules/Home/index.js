import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './pages/Main';
import Profile from './pages/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator 
      backBehavior="history"
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen 
        name="Main" 
        component={Main} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default {
  name: 'Home',
  component: Home,
};
