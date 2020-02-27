import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import GradientButton from 'react-native-gradient-buttons';
import ValidationComponent from 'react-native-form-validator'
import { emailValidator } from '../components/EmailValidate'
import { emailConstraints } from '../components/EmailConstraints'

import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {firstName: '', lastName: '', email: '', password: ''}
    // this.signUpCallback = this.signUpCallback.bind(this)
  }
  emailCallback = (email) => {
    this.setState({...this.state, email: email})
  }
  passwordCallback = (password) => {
    this.setState({...this.state, password: password})
  }
  render() {
    return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text
            style={styles.titleText}
          >Become a Zero member</Text>
        </View>
        <View style={styles.firstNameContainer}>
          <TextInput
              style = {{
                  backgroundColor: '#FFFFFF',
                  height: 50,
                  borderWidth: 1,
                  borderRadius: 15,
                  paddingLeft: 16,
                  borderColor: '#F79E8E'
              }}
              placeholder = "First Name"
              placeholderTextColor = '#7E7676'
          >
          </TextInput>
        </View>
        <View style={styles.lastNameContainer}>
          <TextInput
                style = {{
                    backgroundColor: '#FFFFFF',
                    height: 50,
                    borderWidth: 1,
                    borderRadius: 15,
                    paddingLeft: 16,
                    borderColor: '#F79E8E'
                }}
                placeholder = "Last Name"
                placeholderTextColor = '#7E7676'
            >
            </TextInput>
        </View>
        <View style={styles.emailContainer}>
          <EmailInput emailCallback={this.emailCallback}></EmailInput>
        </View>
        <View style={styles.passWordContainer}>
          <PasswordInput passwordCallback={this.passwordCallback}></PasswordInput>
        </View>
        <View style={styles.alreadyContainer}
        >
          <Button 
            title='Already have an account'
            color='#7e7676'
            type='clear'
          />
        </View>
        <Text style={styles.agreeTerms}>
                By creating an account you agree to our Terms of Service and Private Policy
        </Text>
        <View style={styles.joinContainer}>
          <GradientButton
            style={styles.joinScreenButton}
            gradientBegin="#F7DBC9"
            gradientEnd='#F79E8E'
            gradientDirection="vertical"
            text="Join Now"
            radius = {15}
            textStyle={styles.joinText}
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
      paddingTop: 154,
      paddingLeft: 24
    },
    titleText: {
      color: '#F79E8E',
      fontSize: 24,
      width: 265,
      height: 33,
      fontWeight: 'bold'
    },
    firstNameContainer: {
      paddingTop: 50,
      paddingLeft: 24,
      paddingRight: 24
    },
    lastNameContainer: {
      paddingTop: 16,
      paddingLeft: 24,
      paddingRight: 24
    },
   emailContainer: {
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24
   }, 
   passWordContainer: {
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24
   },
   joinContainer: {
    paddingTop: 28,
    paddingLeft: 43,
   },
   joinText: {
    color:'#fff',
    textAlign:'center',
    paddingTop: 17,
    fontSize: 18,
    paddingBottom: 17
   },
   joinScreenButton: {
    width: 327,
    height: 50,
    opacity: 100
   },
   alreadyContainer: {
      paddingTop: 30,
      paddingLeft: 97,
      paddingRight: 97,
   },
   agreeTerms: {
     paddingTop: 47,
     paddingLeft: 78,
     paddingRight: 78,
     fontSize: 12,
     fontFamily: 'sofia-pro',
     color: '#7E7676',
     textAlign: 'center',
     lineHeight: 22
   }
});
