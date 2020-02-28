import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import GradientButton from 'react-native-gradient-buttons';
import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: '', 
                  password: '',
                  goodEmail: true}
    this.emailCallback = this.emailCallback.bind(this)
    this.passwordCallback = this.passwordCallback.bind(this)

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
  }
  render() {
    const emailError = <Text style={{paddingLeft: 6, color: 'red'}}>Please enter a valid email!</Text>
    const passwordError = <Text style={{paddingLeft: 6, color: 'red'}}>Please enter a valid password!</Text>
    return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text
            style={styles.titleText}
          >Login in to Zero</Text>
        </View>
        <View style={styles.emailContainer}>
          <EmailInput emailCallback={this.emailCallback}></EmailInput>
          {this.state.goodEmail ? null : emailError}
        </View>
        <View style={styles.passWordContainer}>
          <PasswordInput passwordCallback={this.passwordCallback}></PasswordInput>
          {this.state.goodEmail ? null : passwordError}
        </View>
        <View style={styles.signUpContainer}
        >
          <Button 
            title='New to Zero'
            color='#7e7676'
            type='clear'
            onPress={() => {this.props.navigation.navigate('Signup')}}
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

HomeScreen.navigationOptions = {
  header: null,
};

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
