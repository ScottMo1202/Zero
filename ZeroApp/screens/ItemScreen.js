import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, } from 'react-native';
import ModalSelector from 'react-native-modal-selector'
import firebase from '../components/firebase'
import ListScreen from './ListScreen'
import { render } from 'react-dom';
import * as Font from 'expo-font';

export default class ItemScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assetsLoaded: false,
            showEditOption: false
        }
        this.editProduct = this.editProduct.bind(this)
    }

    async componentDidMount() {
        await Font.loadAsync({
            'muli-bold': require('../assets/fonts/Muli-Bold.ttf'),
            'muli-regular': require('../assets/fonts/Muli-Regular.ttf')
          });
          this.setState({assetsLoaded: true})
    }
    editProduct(option) {
        console.log(this.props.route.params.theKey)
        if(option.label == 'Delete') {
            firebase.database().ref('items/' + this.props.route.params.theKey).remove()
            this.props.navigation.navigate("List")
        } else if(option.label == 'Mark as used') {
            firebase.database().ref('items/' + this.props.route.params.theKey).update({
                used: true
            })
        }
    }
    render() {
        const {assetsLoaded} = this.state
        const {navigation} = this.props.navigation
        const options = [
            {label: 'Mark as used'},
            {label: 'Delete'}
        ]
        if(!assetsLoaded) {
            return null
          } else {
              return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={
                                    require('../assets/images/cosmetic.png')
                                }
                                style={styles.itemImage}
                            />
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.title}>{this.props.route.params.title}</Text>
                            <Text style={styles.category}>{this.props.route.params.category}</Text>
                        </View>
                        <View style={styles.expireContainer }>
                            <Text style={styles.num}>{this.props.route.params.num}</Text>
                            <Text style={styles.unit}>{this.props.route.params.unit}</Text>
                            <Text style={styles.expireDate}>{this.props.route.params.expireDate ? this.props.route.params.expireDate : 'Estimated, no specific expiration date'}</Text>
                        </View>
                        <View
                            style={{
                                paddingTop: 10,
                                borderBottomColor: '#8B7777',
                                borderBottomWidth: 1,
                            }}
                        />
                        <View style={styles.purchaseContainer}>
                            <Text style={styles.purText}>Date of purchase: </Text>
                            <Text style={styles.purDate}>{this.props.route.params.purchaseDate}</Text>
                            <Text style={styles.noText}>Notes:</Text>
                            <Text style={styles.note}>{this.props.route.params.note}</Text>
                        </View>
                        <View style={styles.ediContainer}>
                            <ModalSelector 
                            style={styles.editButton} 
                            data={options}
                            onChange={(option) => {this.editProduct(option)}}
                            >
                                <Text style={styles.editText}>Edit</Text>
                            </ModalSelector>
                        </View>
                    </ScrollView>
                </View>
              )
          }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageContainer: {
        opacity: 100
    },
    itemImage: {
        width: 375,
        height: 240.38
    },
    nameContainer: {
        paddingTop: 21.61
    },
    title: {
        paddingLeft: 25,
        fontSize: 18,
        color: '#53A386',
        fontFamily: 'muli-bold'
    },
    category: {
        paddingLeft: 25,
        paddingTop: 10,
        fontSize: 12,
        color: '#8B7777',
        fontFamily: 'muli-regular'
    },
    expireContainer: {
        display: 'flex'
    },
    num: {
        textAlign: 'center',
        color: '#2EB97C',
        paddingTop: 15,
        fontSize: 65,
        fontFamily: 'muli-bold',
    },
    unit: {
        textAlign: 'center',
        color: '#53A386',
        paddingTop: 0,
        fontSize: 14,
        fontFamily: 'muli-bold'
    },
    expireDate: {
        textAlign: 'center',
        color: '#8B7777',
        paddingTop: 10,
        fontSize: 14,
        fontFamily: 'muli-regular'
    },
    purchaseContainer: {
        paddingLeft: 25,
        display: 'flex'
    },
    purText: {
        color: '#8B7777',
        paddingTop: 15.5,
        fontSize: 16,
        fontFamily: 'muli-regular'
    },
    purDate: {
        color: '#8B7777',
        fontSize: 16,
        fontFamily: 'muli-regular'
    },
    noText: {
        color: '#8B7777',
        paddingTop: 15.5,
        fontSize: 16,
        fontFamily: 'muli-regular'
    },
    note: {
        color: '#8B7777',
        fontSize: 16,
        fontFamily: 'muli-regular'
    },
    ediContainer: {
        display: 'flex',
        paddingTop: 30
    },
    editButton: {
        alignSelf: 'center',
        width: 105,
        height: 50,
        backgroundColor:'#53A386',
        borderColor: '#53A386',
        borderWidth: 1,
        borderRadius: 15,

    },
    editText: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'muli-bold',
        paddingTop: 16,
        color: '#FFFFFF',
    }
})