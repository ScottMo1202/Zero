import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import GradientButton from 'react-native-gradient-buttons';
import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';
import firebase from '../components/firebase'
import * as Font from 'expo-font';
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assetsLoaded: false,
      email: '', 
      password: '',
      goodEmail: true, 
      goodPassword: true,
    }
    this.emailCallback = this.emailCallback.bind(this)
    this.passwordCallback = this.passwordCallback.bind(this)

  }
  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if(user) {
  //       console.log("hello")
  //     }
  //   })
  // }
  async componentDidMount() {
    await Font.loadAsync({
      'muli-bold': require('../assets/fonts/Muli-Bold.ttf'),
      'muli-regular': require('../assets/fonts/Muli-Regular.ttf')
    });
    this.setState({assetsLoaded: true})
  }
  emailCallback = (email) => {
    this.setState({...this.state, email: email})
  }
  passwordCallback = (password) => {
    this.setState({...this.state, password: password})
  }
  onLogin(email, password) {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(emailReg.test(email) === false) {
      this.setState({goodEmail: false})
    } else {
      this.setState({goodEmail: true})
    }
    if(password === '') {
      this.setState({goodPassword: false})
    } else {
      this.setState({goodPassword: true})
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
      this.setState({loginSuccess: true})
      this.props.navigation.navigate('Home Screen')
    })
    .catch((error) => {
      this.setState({loginSuccess: false})
      console.log(error.message)
    })

  }
  render() {
    const {assetsLoaded} = this.state
    const emailError = <Text style={{paddingLeft: 6, color: 'red'}}>Please enter a valid email!</Text>
    const passwordError = <Text style={{paddingLeft: 6, color: 'red'}}>Please enter a valid password!</Text>
    const loginError = <Text style={{paddingLeft: 6, color: 'red'}}>Email or password not correct!</Text>
    if(!assetsLoaded) {
      return null
    } else {
      return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text
              style={styles.titleText}
            >Log in to Zero</Text>
          </View>
          <View style={styles.emailContainer}>
            <EmailInput emailCallback={this.emailCallback}></EmailInput>
            {this.state.goodEmail ? null : emailError}
          </View>
          <View style={styles.passWordContainer}>
            <PasswordInput passwordCallback={this.passwordCallback}></PasswordInput>
            {this.state.goodPassword ? null : passwordError}
          </View>
          <View style={styles.signUpContainer}
          >
            <Button 
              title='New to Zero'
              fontFamily='muli-regular'
              color='#7e7676'
              type='clear'

              onPress={() => {this.props.navigation.navigate('Signup')}}
            />
          </View>
          <View style={styles.forgotContainer}
          >
            <Button 
              title='Forget your password'
              fontFamily='muli-regular'
              color='#7e7676'
              type='clear'
              // onPress={() => {this.props.navigation.navigate('Manual Input')}}
              onPress={() => {this.props.navigation.navigate('Home Screen2')}} //for testing purpose
            />
          </View>
          <View style={styles.loginContainer}>
          {this.state.loginSuccess ? null : loginError}
            <GradientButton
              style={styles.loginScreenButton}
              gradientBegin="#53A386"
              gradientEnd='#53A386'
              gradientDirection="vertical"
              text="Log in"
              radius = {15}
              textStyle={styles.loginText}
              onPressAction={() => this.onLogin(this.state.email, this.state.password)}
              >
            </GradientButton>
          </View>
        </ScrollView>
      </View>
    );
  }
}
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    titleContainer: {
      paddingTop: 169,
      paddingLeft: 24
    },
    titleText: {
      color: '#53A386',
      fontSize: 24,
      fontFamily: 'muli-bold',
      width: 200,
      height: 33,
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
    paddingTop: 80,
    paddingLeft: 43,
    paddingRight: 43
   },
   loginText: {
    color:'#fff',
    textAlign:'center',
    paddingTop: 17,
    fontSize: 18,
    fontFamily: 'muli-bold',
    paddingBottom: 17
   },
   loginScreenButton: {
    width: 283,
    height: 50,
    opacity: 100
   },
   signUpContainer: {
      paddingTop: 30,
      paddingLeft: 120,
      paddingRight: 120,
   },
   forgotContainer: {
     paddingTop: 0,
     paddingLeft: 89,
     paddingRight: 89
   }
});
