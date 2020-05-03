import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, DatePickerIOS, Button, TouchableOpacity, Keyboard, UIManager, Animated} from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import RNPickerSelect from 'react-native-picker-select'
import * as Font from 'expo-font';

import firebase from '../components/firebase'

const { State: TextInputState } = TextInput;

export default class ManualInputScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assetsLoaded: false,
      title: '',
      purchaseDate: '',
      expireDate: '',
      category: '',
      note: '',
      showPurchaseDatePicker: false,
      showExpireDatePicker: false,
      showCategoryPicker: false,
      goodTitle: true,
      goodExpireDate: true,
      shift: new Animated.Value(0)
    }
    this.handleKeyboardDidHide = this.handleKeyboardDidHide.bind(this);
    this.handleKeyboardDidShow = this.handleKeyboardDidShow.bind(this);
    this.submitItemInfo = this.submitItemInfo.bind(this);
  }

  async componentDidMount() {
    // fetch group data from firebase
    this.itemsRef = firebase.database().ref('items');

    await Font.loadAsync({
      'muli-bold': require('../assets/fonts/Muli-Bold.ttf'),
      'muli-regular': require('../assets/fonts/Muli-Regular.ttf')
    });
    this.setState({assetsLoaded: true})
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide)
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();

    // stop fetching data from firebase
    this.itemsRef.off();
  }

  handleKeyboardDidShow(event) {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: gap,
          duration: 200,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide() {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }

  /* From Scott, remain the code just in case need to use them later */
  // onSubmit(title, expireDate) {
  //     this.validateForm(title, expireDate)
  // }
  // validateForm(title, expireDate) {
  //   if (title === '') {
  //     this.setState({goodTitle: false})
  //   } else {
  //     this.setState({goodTitle: true})
  //   }
  //   if (expireDate === '') {
  //     this.setState({goodExpireDate: false})
  //   } else {
  //     this.setState({goodExpireDate: true})
  //   }
  // }

  // the function is used to trigger the submit event for submitting item's information
  submitItemInfo = () => {
    // event.preventDefault(); // prevent the default behavior of the form

    const itemsRef = firebase.database().ref('items');

    const newItem = {
      // user: this.state.user.uid,
      title: this.state.title,
      purchaseDate: this.state.purchaseDate,
      expireDate: this.state.expireDate,
      category: this.state.category,
      note: this.state.note
    }
    // push the new item to firebase db
    itemsRef.push(newItem);
    
    //empty out for next time
    this.setState({
      // user: this.props.currentUser,
      title: "",
      purchaseDate: "",
      expireDate: "",
      category: "",
      note: ""
    });

    alert('You have saved the new item!')
  }

  checkDateColor(date) {
    if (date === '') {
      return {color: '#7E7676', paddingTop: 16}
    } else {
      return {color: 'black', paddingTop: 16}
    }
  }

  render() {
    const {assetsLoaded} = this.state;
    const { shift } = this.state;
    const categoryItems = [{
      label: 'Food',
      value: 'Food',
    },
    {
      label: 'Cosmetics',
      value: 'Cosmetics',
    },
    {
      label: 'Medication',
      value: 'Medication',
    },
    {
      label: 'Personal Care',
      value: 'Personnal Care',
    }]
    let moment = require('moment')
    let purchaseDatepicker = this.state.showPurchaseDatePicker ? 
                      <DatePickerIOS style={{ height: 150 }}
                                    mode="date"
                                    date={this.state.purchaseDate === '' ? new Date() : this.state.purchaseDate}
                                    onDateChange={(purchaseDate) => this.setState({purchaseDate})}/> : null
    let expireDatepicker= this.state.showExpireDatePicker ? 
                      <DatePickerIOS style={{ height: 150 }}
                                    mode="date"
                                    date={this.state.expireDate === '' ? new Date() : this.state.expireDate}
                                    onDateChange={(expireDate) => this.setState({expireDate})}/> : null
    const titleError = <Text style={{paddingLeft: 6, color: 'red'}}>The title is required!</Text>
    const expireDateError = <Text style={{paddingLeft: 6, color: 'red'}}>The expire date is required!</Text>
    if (assetsLoaded) {
      return (
        <View style={styles.container}>
          <Animated.ScrollView behavior="padding" style={[styles.container, { transform: [{translateY: shift}] }]}>
          {/* <ScrollView style={styles.container} behavior="padding"> */}
            <View style={styles.topicContainer}>
              <Text
                style={styles.topicText}
              >Record a new entry</Text>
            </View>

            {/* manual input -  Item Name */}
            <View style={styles.titleContainer}>
                <TextInput
                    style = {styles.generalInput}
                    placeholder = "Item Name"
                    placeholderTextColor = '#7E7676'
                    onChangeText = {(title) => {this.setState({...this.state, title: title})}}
                    value = {this.state.title}
                >
                </TextInput>
                {this.state.goodTitle ? null : titleError}
            </View>

            {/* manual input - Purchase Date */}
            <View style={styles.generalInputContainer}>
                <TouchableOpacity 
                  style={styles.generalInput} 
                  onPress={() => this.setState((currentState) => {
                      let stateChanges = {
                        showPurchaseDatePicker: !this.state.showPurchaseDatePicker,
                        purchaseDate: moment(this.props.purchaseDate ? 
                          this.props.purchaseDate : this.state.purchaseDate).format('MM/DD/YYYY')
                      };
                      return stateChanges;
                      })}>

                    <Text
                      style={this.checkDateColor(this.props.purchaseDate ? this.props.purchaseDate : this.state.purchaseDate)}>

                      {(!this.props.purchaseDate && 
                      this.state.purchaseDate === '') ? 'Purchase Date' : moment(this.props.purchaseDate ? 
                      this.props.purchaseDate : this.state.purchaseDate).format('MM/DD/YYYY')}
                    </Text>
                </TouchableOpacity>
                {purchaseDatepicker}
            </View>

            {/* manual input - Expiration Date */}
            <View style={styles.generalInputContainer}>
                <TouchableOpacity style={styles.generalInput} onPress={() => this.setState({showExpireDatePicker: !this.state.showExpireDatePicker})}>
                    <Text style={this.checkDateColor(this.props.expireDate ? 
                      this.props.expireDate : this.state.expireDate)}>{(!this.props.expireDate && 
                      this.state.expireDate === '') ? 'Expiration Date' : moment(this.props.expireDate ? 
                      this.props.expireDate : this.state.expireDate).format('MM/DD/YYYY')}</Text>
                </TouchableOpacity>
                {expireDatepicker}
                {this.state.goodExpireDate ? null : expireDateError}
            </View>

            <View style={styles.cantFind}>
              <TouchableOpacity>
                <Text style={{fontFamily: 'muli-regular', color: '#53A386'}}>Can't find a specific date?</Text>
              </TouchableOpacity>
            </View>
            
            {/* manual input - Category */}
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Category',
                        value: null,
                    }}
                    placeholderTextColor= '#7E7676'
                    items = {categoryItems}
                    onValueChange={(category) => {
                        this.setState({
                            category: category
                        });
                    }}
                    value={this.props.category ? this.props.category : this.state.category}
                />
            </View>

            {/* manual input - Notes */}
            <View style={styles.generalInputContainer}>
                <TextInput
                    style = {styles.generalInput}
                    placeholder = "Notes"
                    placeholderTextColor = '#7E7676'
                    onChangeText = {(note) => {this.setState({...this.state, note: note})}}
                    value = {this.props.note ? this.state.note : this.state.note}
                >
                </TextInput>
            </View>

            {/* manual input - Submit */}
            {/* ignore Save at this time */}
            <View style={styles.submitContainer}>
              <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>

              <GradientButton
                style={styles.submitButton}
                gradientBegin="#53A386"
                gradientEnd='#53A386'
                gradientDirection="vertical"
                text="Submit"
                radius = {15}
                textStyle={styles.submitText}
                // onPressAction={() => this.onSubmit(this.state.title, this.state.expireDate, this.state.category)}
                onPressAction={this.submitItemInfo}
              ></GradientButton>
            </View>
          {/* </ScrollView> */}
          </Animated.ScrollView>
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
    topicContainer: {
      paddingTop: 114,
      paddingLeft: 80,
      paddingRight: 80
    },
    topicText: {
      color: '#53A386',
      fontSize: 22,
      fontFamily: 'muli-bold'
    },
    titleContainer: {
      paddingTop: 35,
      paddingLeft: 24,
      paddingRight: 24
    },
    generalInputContainer: {
      paddingTop: 16,
      paddingLeft: 24,
      paddingRight: 24
    },
    cantFind: {
      paddingLeft: 40,
      paddingTop: 8
    },
    generalInput: {
      backgroundColor: '#FFFFFF',
      height: 50,
      borderWidth: 1,
      borderRadius: 15,
      paddingLeft: 16,
      borderColor: '#53A386'
    },
    submitContainer: {
      paddingTop: 67,
      flexDirection: 'row'
    },
    saveButton: {
      paddingLeft: 63,
      opacity: 100,
      paddingRight: 20,
      flex: 1
    },
    saveText: {
      textAlign: 'center',
      fontSize: 16,
      fontFamily: 'muli-bold',
      width: 105,
      height: 50,
      paddingTop: 16,
      color: '#7E7676',
      borderColor: '#53A386',
      borderWidth: 1,
      borderRadius: 15,
    },
    submitButton: {
      flex: 1,
      paddingRight: 63,
      opacity: 100,
      width: 110,
      height: 50 
    },
    submitText: {
      color:'#fff',
      textAlign:'center',
      paddingTop: 16,
      fontSize: 16,
      fontFamily: 'muli-bold',
      paddingBottom: 17
    }, 
    pickerContainer: {
        height: 50,
        borderWidth: 1,
        borderColor: '#53A386',
        paddingTop: 16,
        borderRadius: 15,
        backgroundColor: 'white',
        marginLeft: 24,
        marginRight: 24,
        marginTop: 8,
        paddingLeft: 16
        // color: 'black',
    }
});
