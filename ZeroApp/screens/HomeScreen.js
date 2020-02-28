import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput, DatePickerIOS, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import GradientButton from 'react-native-gradient-buttons';
import { render } from 'react-dom';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      purchaseDate: '',
      expireDate: '',
      category: '',
      note: '',
      showPurchaseDatePicker: false,
      showExpireDatePicker: false
    }
  }
  render() {
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
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
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
          </View>
          <View style={styles.generalInputContainer}>
              <TouchableOpacity style={styles.generalInput} onPress={() => this.setState({showPurchaseDatePicker: !this.state.showPurchaseDatePicker})}>
                  <Text style={{color: '#7E7676', paddingTop: 16}}>{this.state.purchaseDate === '' ? 'Date of purchase' : moment(this.state.purchaseDate).format('MM/DD/YYYY')}</Text>
              </TouchableOpacity>
              {purchaseDatepicker}
          </View>
          <View style={styles.generalInputContainer}>
              <TouchableOpacity style={styles.generalInput} onPress={() => this.setState({showExpireDatePicker: !this.state.showExpireDatePicker})}>
                  <Text style={{color: '#7E7676', paddingTop: 16}}>{this.state.expireDate=== '' ? 'Expire date' : moment(this.state.expireDate).format('MM/DD/YYYY')}</Text>
              </TouchableOpacity>
              {expireDatepicker}
          </View>
          <View style={styles.generalInputContainer}>
              <TextInput
                  style = {styles.generalInput}
                  placeholder = "Category"
                  placeholderTextColor = '#7E7676'
                  onChangeText = {(category) => {this.setState({...this.state, category: category})}}
                  value = {this.state.category}
              >
              </TextInput>
          </View>
          <View style={styles.generalInputContainer}>
              <TextInput
                  style = {styles.generalInput}
                  placeholder = "Add note"
                  placeholderTextColor = '#7E7676'
                  onChangeText = {(note) => {this.setState({...this.state, note: note})}}
                  value = {this.state.category}
              >
              </TextInput>
          </View>
        </ScrollView>
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
    }
});
