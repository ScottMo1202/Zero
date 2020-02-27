import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

export class EmailInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {email: ''}
    }
    handleChange(email) {
        this.setState({email: email});
        this.props.emailCallback(email)
    }
    render() {
        // const [email, onChangeText] = React.useState('')
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
                    placeholder = "Email"
                    placeholderTextColor = '#7E7676'
                    onChangeText = {(email) => this.handleChange(email)} 
                    value={this.state.email}
                >
                </TextInput>
        )
    }
    
}