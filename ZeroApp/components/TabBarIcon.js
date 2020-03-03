import * as React from 'react';
import { Image } from 'react-native'

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Image
      {...props}
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
