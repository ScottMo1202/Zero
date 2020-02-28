import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

export class PasswordInput extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {password: ''}
    }
    handleChange(password) {
        this.setState({password: password});
        this.props.passwordCallback(password)
    }
    render() {
        return (
            <TextInput
                style = {{
                    backgroundColor: '#FFFFFF',
                    height: 327,
                    height: 50,
                    borderWidth: 1,
                    borderRadius: 15,
                    paddingLeft: 16,
                    borderColor: '#F79E8E'
                }}
                placeholder = "Password"
                placeholderTextColor = '#7E7676'
                secureTextEntry
                onChangeText = {(password) => this.handleChange(password)} 
                value={this.state.password}
            >
            </TextInput>
        )
    }
    
}