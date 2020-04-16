import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Span } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';

export default class HomeScreen2 extends React.Component {

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
        this.setState({assetsLoaded:true})
    }
    render() {
        const {assetsLoaded} = this.state
        if(assetsLoaded) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <View style={styles.intro}>
                            <Text style={[styles.title]}>Zero, an eco-friendly lifestyle.</Text>
                        </View>
                    </ScrollView>
                </View>
            )
        } else {
            return null
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    intro: {
        paddingTop: 0,
        width: 375,
        height: 100,
        backgroundColor: '#80CEAC'
    },
    title: {
        paddingTop: 59,
        paddingLeft: 25,
        fontSize: 20,
        fontFamily: 'muli-bold',
        color: '#FFFFFF'
    }
})