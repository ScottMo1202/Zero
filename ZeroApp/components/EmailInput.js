import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import * as Font from 'expo-font';
export class EmailInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {email: ''}
    }
    componentDidMount() {
        Font.loadAsync({
          'muli-regular': require('../assets/fonts/Muli-Regular.ttf')
        });
      }
    handleChange(email) {
        this.setState({email: email});
        this.props.emailCallback(email)
    }
    render() {
        return (
                <TextInput
                    style = {{
                        fontFamily: "muli-regular",
                        backgroundColor: '#FFFFFF',
                        height: 327,
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 15,
                        paddingLeft: 16,
                        borderColor: '#53A386',
                    }}
                    placeholder = "Email"
                    placeholderTextColor = '#7E7676'
                    onChangeText = {(email) => this.handleChange(email)} 
                    value={this.state.email}
                >
                </TextInput>
        )
    }
    
}