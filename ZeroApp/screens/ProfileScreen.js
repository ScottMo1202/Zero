import * as React from 'react';

import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import GradientButton from 'react-native-gradient-buttons';
import { EmailInput } from '../components/EmailInput';
import { PasswordInput } from '../components/PasswordInput';
import firebase from '../components/firebase'
import * as Font from 'expo-font';
import { withNavigation } from 'react-navigation';
export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            assetsLoaded: false
        }
    }
    async componentDidMount() {
        await Font.loadAsync({
          'muli-bold': require('../assets/fonts/Muli-Bold.ttf'),
          'muli-regular': require('../assets/fonts/Muli-Regular.ttf')
        });
        this.setState({assetsLoaded: true})
    }
    render() {
        const user = firebase.auth().currentUser;
        const {assetsLoaded} = this.state
        if(!assetsLoaded) {
            return null
        } else {
            return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <View style={styles.greeting}>
                        <Text style={styles.hello}>Hello, {user ? user.displayName.slice(0, user.displayName.indexOf(' ')) : "None"}</Text>
                    </View>
                    <View style={styles.pictureContainer}>
                        <Image
                            source={
                                require('../assets/icons/profile-pic.png')
                            }
                            style={styles.profileImage}
                        />
                        <View
                            style={{
                                borderBottomColor: '#00000029',
                                borderBottomWidth: 1,
                                marginTop: 26
                            }}
                        />
                    </View>
    
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>Name: <Text style={{paddingLeft: 18, color: '#8B7777'}}>{user ? user.displayName : "Capstone"}</Text></Text>
                        <View
                            style={{
                                borderBottomColor: '#00000029',
                                borderBottomWidth: 1,
                                marginTop: 26
                            }}
                        />
                    </View>
                    <View style={styles.emailContainer}>
                        <Text style={styles.email}>Email: <Text style={{paddingLeft: 18, color: '#8B7777'}}>{user ? user.email : "capstone@uw.edu"}</Text></Text>
                        <View
                            style={{
                                borderBottomColor: '#00000029',
                                borderBottomWidth: 1,
                                marginTop: 26
                            }}
                        />
                    </View>
                    <View style={styles.logoutContainer}>
                        <TouchableOpacity>
                            <Text style={styles.logout}>Log Out</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                borderBottomColor: '#00000029',
                                borderBottomWidth: 1,
                                marginTop: 26
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
            )
        }
    }
}
ProfileScreen.navigationOptions = {
    header: null,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',    
    },
    greeting: {
        paddingTop: 0,
        width: 375,
        height: 74,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,

    },
    hello: {
        paddingTop: 35,
        paddingLeft: 126,
        fontSize: 23,
        fontFamily: 'muli-bold',
        color: '#53A386',
    },
    pictureContainer: {
        paddingTop: 0,
        height: 132
    },
    profileImage: {
        height: 100,
        width: 100,
        marginTop: 26,
        marginLeft: 25,
    },
    nameContainer: {
        paddingTop: 0,
        height: 69,
    },
    name: {
        paddingTop: 44.5,
        paddingLeft: 25,
        fontSize: 17,
        fontFamily: 'muli-regular',
        color: '#53A386'
    }, 
    emailContainer: {
        paddingTop: 0,
        height: 69
    },
    email: {
        paddingTop: 44.5,
        paddingLeft: 25,
        fontSize: 17,
        fontFamily: 'muli-regular',
        color: '#53A386'
    }, 
    logoutContainer: {
        paddingTop: 0,
        height: 90
    },
    logout: {
        paddingTop: 57,
        paddingLeft: 159,
        fontSize: 17,
        fontFamily: 'muli-regular',
        color: '#53A386'
    }
})