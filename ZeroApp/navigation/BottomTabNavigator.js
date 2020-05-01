import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ScanScreen from '../screens/ScanScreen';
import LoginScreen from '../screens/LoginScreen'
import ListScreen from '../screens/ListScreen';
import firebase from '../components/firebase'
import ProfileScreen from '../screens/ProfileScreen'
import ManualInputScreen from '../screens/ManualInputScreen';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import HomeScreen2 from '../screens/HomeScreen2';
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  const user = firebase.auth().currentUser

  return (
    <BottomTab.Navigator style={{backgroundColor: '#F6A192'}} initialRouteName={INITIAL_ROUTE_NAME} tabBarOptions={{
      activeTintColor: '#F6A192',
      tabStyle:{
        backgroundColor:'#E4FCF5',
        bottom: 0,
        height: 80,
      }
    }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen2}
        options={{
          tabBarLabel:"",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={require("../assets/icons/home.png")} />,
        }}
      />
      <BottomTab.Screen
        name="Manual Input"
        component={ManualInputScreen}
        options={{
          tabBarLabel:"",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={require("../assets/icons/edit.png")} />,
        }}
      />
      <BottomTab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarLabel:"",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={require("../assets/icons/scan.png")} />,
        }}
      />
      <BottomTab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarLabel:"",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={require("../assets/icons/list.png")} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={user ? ProfileScreen : LoginScreen}
        options={{
          tabBarLabel:"",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={require("../assets/icons/profile.png")} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Manual Input':
      return 'Record your product manually';
    case 'Scan':
      return 'Scan your product';
    case 'List':
      return 'Prudct list'
    case 'Profile': 
      return 'Profile'
  }
}
