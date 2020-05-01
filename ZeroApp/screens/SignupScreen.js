import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import GradientButton from 'react-native-gradient-buttons';
import * as Font from 'expo-font';
import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';
import firebase from '../components/firebase'
// import  firebase from 'firebase/app'
// import 'firebase/auth';
// import 'firebase/database';

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assetsLoaded: false,
      firstName: '',
      lastName: '', 
      email: '', 
      password: '',
      goodFirstName: true,
      goodLastName: true,
      goodEmail: true,
      doubleEmail: false,
      goodPassword: true
    }
  }
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
  async onJoin(email, firstName, lastName, password) {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(emailReg.test(email) === false) {
      this.setState({...this.state, goodEmail: false})
      return
    } else {
      this.setState({...this.state, goodEmail: true})
    }
    if(firstName === '') {
      this.setState({goodFirstName: false})
      return 
    } else {
      this.setState({goodFirstName: true})
    }
    if(lastName === '') {
      this.setState({goodLastName: false})
      return 
    } else {
      this.setState({goodLastName: true})
    }
    if(password === '') {
      this.setState({goodPassword: false})
      return
    } else {
      this.setState({goodPassword: true})
    }
    await firebase.auth().createUserWithEmailAndPassword(email, password) 
      .then((userCredentials) => {
        this.setState({doubleEmail: false})
        user = userCredentials.user
      })
      .catch((error) => {
        console.log(error.message)
        this.setState({doubleEmail: true})
      })
      let user = firebase.auth().currentUser;
      await user.updateProfile({
        displayName: firstName + ' ' + lastName,
      }).then(function() {
      }).catch(function(error) {
      });
      console.log(user)
  }
  // validateForm(email, firstName, lastName, password) {
  //   let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  //   if(emailReg.test(email) === false) {
  //     this.setState({...this.state, goodEmail: false})
  //     return
  //   } else {
  //     this.setState({...this.state, goodEmail: true})
  //   }
  //   if(firstName === '') {
  //     this.setState({goodFirstName: false})
  //     return 
  //   } else {
  //     this.setState({goodFirstName: true})
  //   }
  //   if(lastName === '') {
  //     this.setState({goodLastName: false})
  //     return 
  //   } else {
  //     this.setState({goodLastName: true})
  //   }
  //   if(password === '') {
  //     this.setState({goodPassword: false})
  //     return
  //   } else {
  //     this.setState({goodPassword: true})
  //   }
  //   this.onJoin(email, password)
  // }
  render() {
    const {assetsLoaded} = this.state
    const firstNameError = <Text style={{paddingLeft: 6, color: 'red'}}>The first name is required!</Text>
    const lastNameError = <Text style={{paddingLeft: 6, color: 'red'}}>The last name is required!</Text>
    const emailError = <Text style={{paddingLeft: 6, color: 'red'}}>Please enter a valid email!</Text>
    const emailDouble = <Text style={{paddingLeft: 6, color: 'red'}}>Email already exists!</Text>
    const passwordError = <Text style={{paddingLeft: 6, color: 'red'}}>Please enter a valid password!</Text>
    if(!assetsLoaded) {
      return null;
    } else {
    return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text
                style={styles.titleText}
              >Become a Zero Member</Text>
            </View>
            <View style={styles.firstNameContainer}>
              <TextInput
                  style = {styles.generalInput}
                  placeholder = "First Name"
                  placeholderTextColor = '#7E7676'
                  onChangeText = {(firstName) => {this.setState({...this.state, firstName: firstName})}}
                  value = {this.state.firstName}
              >
              </TextInput>
              {this.state.goodFirstName ? null : firstNameError}
            </View>
            <View style={styles.lastNameContainer}>
              <TextInput
                    style = {styles.generalInput}
                    placeholder = "Last Name"
                    placeholderTextColor = '#7E7676'
                    onChangeText = {(lastName) => {this.setState({...this.state, lastName: lastName})}}
                    value = {this.state.lastName}
                >
                </TextInput>
                {this.state.goodLastName ? null : lastNameError}
            </View>
            <View style={styles.emailContainer}>
              <EmailInput emailCallback={this.emailCallback}></EmailInput>
              {this.state.goodEmail ? null : emailError}
              {this.state.doubleEmail ? emailDouble : null}
            </View>
            <View style={styles.passWordContainer}>
              <PasswordInput passwordCallback={this.passwordCallback}></PasswordInput>
              {this.state.goodPassword ? null : passwordError}
            </View>
            <View style={styles.alreadyContainer}
            >
              <Button 
                title='Already have an account'
                color='#7e7676'
                type='clear'
                onPress={() => {this.props.navigation.navigate('Login')}}
              />
            </View>
            <Text style={styles.agreeTerms}>
                    By creating an account you agree to our Terms of Service and Private Policy
            </Text>
            <View style={styles.joinContainer}>
              <GradientButton
                style={styles.joinScreenButton}
                gradientBegin="#53A386"
                gradientEnd='#53A386'
                gradientDirection="vertical"
                text="Join Now"
                radius = {15}
                textStyle={styles.joinText}
                onPressAction={() => {this.onJoin(this.state.email, this.state.firstName, 
                        this.state.lastName, this.state.password);}}
                >

              </GradientButton>
            </View>
          </ScrollView>
        </View>
      );
  }
}
}

SignupScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    titleContainer: {
      paddingTop: 70,
      paddingLeft: 24
    },
    titleText: {
      color: '#53A386',
      fontFamily: 'muli-bold',
      fontSize: 24,
      width: 265,
      height: 33,
      // fontWeight: 'bold'
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
    paddingRight: 43
   },
   joinText: {
    color:'#fff',
    textAlign:'center',
    fontFamily: 'muli-bold',
    paddingTop: 17,
    fontSize: 18,
    paddingBottom: 17
   },
   joinScreenButton: {
    // width: 327,
    height: 50,
    opacity: 100
   },
   alreadyContainer: {
      paddingTop: 20,
      paddingLeft: 80,
      paddingRight: 80,
   },
   agreeTerms: {
     paddingTop: 37,
     paddingLeft: 78,
     paddingRight: 78,
     fontSize: 12,
    //  fontFamily: 'sofia-pro',
     color: '#7E7676',
     textAlign: 'center',
     lineHeight: 22
   },
   generalInput: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 16,
    borderColor: '#53A386'
   }
});
