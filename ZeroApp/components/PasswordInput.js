import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

export function PasswordInput() {
    
    const [password, onChangeText] = React.useState('')
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
            onChangeText = {(password) => onChangeText(password)} 
            value={password}
        >
        </TextInput>
    )
    
}