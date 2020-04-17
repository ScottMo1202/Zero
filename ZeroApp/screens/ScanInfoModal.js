import React, { Component, useState } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, Image } from 'react-native';

export default class ScanInfoModal extends Component{
    state = { modalVisible: true }
    render() {
      return(
    <View style={{ padding: 200 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}>
        <View style={{ margin: 100 }}>
          <View> 
            <Text>Barcode: {this.props.data && this.props.data.upc}</Text>
            <Text>Title: {this.props.data && this.props.data.title}</Text>
            <Text>Description: {this.props.data && this.props.data.description}</Text>
            <Text>Category: {this.props.data && this.props.data.category}</Text>
            <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: this.props.data && this.props.data.images[0]}}
            />
            <TouchableHighlight
              onPress={() => {
                this.setState({modalVisible: false})
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
    )}
}