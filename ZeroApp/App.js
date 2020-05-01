import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import HomeScreen from './screens/HomeScreen';
import ManualInputScreen from './screens/ManualInputScreen'
import SignupScreen from './screens/SignupScreen'
import LoginScreen from './screens/LoginScreen'
import useLinking from './navigation/useLinking';
import ScanScreen from './screens/ScanScreen';
import ListScreen from './screens/ListScreen';
import ProfileScreen from './screens/ProfileScreen'
import firebse from 'firebase/app'
import 'firebase/auth';
import HomeScreen2 from './screens/HomeScreen2'
const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const user = firebse.auth().currentUser;
  console.log(user)
  // Initialize Firebase
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());
        // Load fonts
        await Font.loadAsync({
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'sofia-pro': require('./assets/fonts/sofiapro-light.otf'),
          'muli-bold': require('./assets/fonts/Muli-Bold.ttf')
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        // SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);


  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="defau,lt" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={user ? ProfileScreen : LoginScreen} />
            {/* <Stack.Screen name="Personal Info" component={ProfileScreen} /> */}
            <Stack.Screen name="Home Screen" component={HomeScreen} />
            <Stack.Screen name="Home Screen2" component={HomeScreen2} />
            <Stack.Screen name="Manual Input" component={ManualInputScreen} />
            <Stack.Screen name="Scan Screen" component={ScanScreen} />
            <Stack.Screen name="List Screen" component={ListScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
