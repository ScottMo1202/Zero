import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, DatePickerIOS, TouchableOpacity, Keyboard, UIManager, Animated} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import GradientButton from 'react-native-gradient-buttons';
import { render } from 'react-dom';
import RNPickerSelect from 'react-native-picker-select'

const { State: TextInputState } = TextInput;

export default class ManualInputScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide)
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  handleKeyboardDidShow = (event) => {
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
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }
  onSubmit(title, expireDate) {
      this.validateForm(title, expireDate)
  }
  validateForm(title, expireDate) {
    if(title === '') {
      this.setState({goodTitle: false})
    } else {
      this.setState({goodTitle: true})
    }
    if(expireDate === '') {
      this.setState({goodExpireDate: false})
    } else {
      this.setState({goodExpireDate: true})
    }
  }
  checkDateColor(date) {
    if(date === '') {
      return {color: '#7E7676', paddingTop: 16}
    } else {
      return {color: 'black', paddingTop: 16}
    }
  }
  render() {
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
    return (
      <View style={styles.container}>
        <Animated.ScrollView behavior="padding" style={[styles.container, { transform: [{translateY: shift}] }]}>
        {/* <ScrollView style={styles.container} behavior="padding"> */}
          <View style={styles.topicContainer}>
            <Text
              style={styles.topicText}
            >Record a new entry</Text>
          </View>
          <View style={styles.titleContainer}>
              <TextInput
                  style = {styles.generalInput}
                  placeholder = "Title"
                  placeholderTextColor = '#7E7676'
                  onChangeText = {(title) => {this.setState({...this.state, title: title})}}
                  value = {this.state.title}
              >
              </TextInput>
              {this.state.goodTitle ? null : titleError}
          </View>
          <View style={styles.generalInputContainer}>
              <TouchableOpacity style={styles.generalInput} onPress={() => this.setState({showPurchaseDatePicker: !this.state.showPurchaseDatePicker})}>
                  <Text style={this.checkDateColor(this.state.purchaseDate)}>{this.state.purchaseDate === '' ? 'Date of purchase' : moment(this.state.purchaseDate).format('MM/DD/YYYY')}</Text>
              </TouchableOpacity>
              {purchaseDatepicker}
          </View>
          <View style={styles.generalInputContainer}>
              <TouchableOpacity style={styles.generalInput} onPress={() => this.setState({showExpireDatePicker: !this.state.showExpireDatePicker})}>
                  <Text style={this.checkDateColor(this.state.expireDate)}>{this.state.expireDate === '' ? 'Expire date' : moment(this.state.expireDate).format('MM/DD/YYYY')}</Text>
              </TouchableOpacity>
              {expireDatepicker}
              {this.state.goodExpireDate ? null : expireDateError}
          </View>
          <View style={styles.pickerContainer}>
              <RNPickerSelect
                  placeholder={{
                      label: 'Select a Category',
                      value: null,
                  }}
                  placeholderTextColor= '#7E7676'
                  items = {categoryItems}
                  onValueChange={(category) => {
                      this.setState({
                          category: category
                      });
                  }}
                  value={this.state.category}
              />
          </View>
          <View style={styles.generalInputContainer}>
              <TextInput
                  style = {styles.generalInput}
                  placeholder = "Add note"
                  placeholderTextColor = '#7E7676'
                  onChangeText = {(note) => {this.setState({...this.state, note: note})}}
                  value = {this.state.note}
              >
              </TextInput>
          </View>
          <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <GradientButton
              style={styles.submitButton}
              gradientBegin="#F7DBC9"
              gradientEnd='#F79E8E'
              gradientDirection="vertical"
              text="Submit"
              radius = {15}
              textStyle={styles.submitText}
              onPressAction={() => this.onSubmit(this.state.title, this.state.expireDate, this.state.category)}
            ></GradientButton>
          </View>
        {/* </ScrollView> */}
        </Animated.ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    topicContainer: {
      paddingTop: 134,
      paddingLeft: 99,
      paddingRight: 99
    },
    topicText: {
      color: '#7E7676',
      fontSize: 22,
      fontWeight: 'bold'
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
    generalInput: {
      backgroundColor: '#FFFFFF',
      height: 50,
      borderWidth: 1,
      borderRadius: 15,
      paddingLeft: 16,
      borderColor: '#F79E8E'
    },
    submitContainer: {
      paddingTop: 87,
      flexDirection: 'row'
    },
    saveButton: {
      paddingLeft: 63,
      opacity: 100,
      flex: 1
    },
    saveText: {
      textAlign: 'center',
      fontSize: 16,
      width: 125,
      height: 50,
      paddingTop: 16,
      color: '#7E7676',
      borderColor: '#F79E8E',
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
      paddingBottom: 17
    }, 
    pickerContainer: {
        height: 50,
        width: 366,
        borderWidth: 1,
        borderColor: '#F79E8E',
        paddingTop: 16,
        borderRadius: 15,
        backgroundColor: 'white',
        marginLeft: 24,
        marginTop: 16,
        paddingLeft: 16
        // color: 'black',
    }
});
