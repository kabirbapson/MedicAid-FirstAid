/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from './utils/tabBar';
import {
  ChatScreen,
  HomeScreen,
  ProfileScreen,
  ScheduleScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

export const Dashboard = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Emergency" component={ScheduleScreen} />
      <Tab.Screen name="Hospital" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
