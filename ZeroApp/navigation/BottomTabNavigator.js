import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ScanScreen from '../screens/ScanScreen';
import ManualInputScreen from '../screens/ManualInputScreen';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator style={{backgroundColor: '#F6A192'}} initialRouteName={INITIAL_ROUTE_NAME} tabBarOptions={{
      activeTintColor: '#F6A192',
      tabStyle:{
        backgroundColor:'#FFF5F3',
        bottom: 0,
        height: 80,
      }
    }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
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
        component={ManualInputScreen}
        options={{
          tabBarLabel:"",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={require("../assets/icons/list.png")} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ManualInputScreen}
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
    case 'Links':
      return 'Links to learn more';
  }
}
