import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import GradientButton from 'react-native-gradient-buttons';
import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text
            style={styles.titleText}
          >Login in to Zero</Text>
        </View>
        <View style={styles.emailContainer}>
          <EmailInput></EmailInput>
        </View>
        <View style={styles.passWordContainer}>
          <PasswordInput></PasswordInput>
        </View>
        <View style={styles.signUpContainer}
        >
          <Button 
            title='New to Zero'
            color='#7e7676'
            type='clear'
          />
        </View>
        <View style={styles.forgotContainer}
        >
          <Button 
            title='Forget your password'
            color='#7e7676'
            type='clear'
          />
        </View>
        <View style={styles.loginContainer}>
          <GradientButton
            style={styles.loginScreenButton}
            gradientBegin="#F7DBC9"
            gradientEnd='#F79E8E'
            gradientDirection="vertical"
            text="Join Now"
            radius = {15}
            textStyle={styles.loginText}
            >
          </GradientButton>
        </View>
      </ScrollView>
    </View>
  );
}
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    titleContainer: {
      paddingTop: 219,
      paddingLeft: 24
    },
    titleText: {
      color: '#F79E8E',
      fontSize: 24,
      width: 200,
      height: 33,
      fontWeight: 'bold'
    },
   emailContainer: {
    paddingTop: 50,
    paddingLeft: 24,
    paddingRight: 24
   }, 
   passWordContainer: {
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24
   },
   loginContainer: {
    paddingTop: 144,
    paddingLeft: 43,
   },
   loginText: {
    color:'#fff',
    textAlign:'center',
    paddingTop: 17,
    fontSize: 18,
    paddingBottom: 17
   },
   loginScreenButton: {
    width: 327,
    height: 50,
    opacity: 100
   },
   signUpContainer: {
      paddingTop: 30,
      paddingLeft: 144,
      paddingRight: 144,
   },
   forgotContainer: {
     paddingTop: 0,
     paddingLeft: 109,
     paddingRight: 109
   }
});
