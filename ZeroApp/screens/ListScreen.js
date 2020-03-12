import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, DatePickerIOS, TouchableOpacity, Keyboard, UIManager, Animated} from 'react-native';

export default function ListScreen() {

    const [value, onChangeText] = React.useState('Search');

    return (
        <View style={styles.container}>
        <View style={styles.titleContainer}>
        <TextInput
            style = {styles.generalInput}
            placeholder = "Search"
            placeholderTextColor = '#7E7676'
            onChangeText={text => onChangeText(text)}
            value={value}
        >
        </TextInput>
        <View style={styles.topicContainer}>
            <Text
              style={styles.topicText}
            >My Expiration Dates</Text>
        </View>
        <View style={styles.itemContainer}>
            <View style={styles.itemColumn}>
            <Text style={styles.itemTitleText}>Ketchap</Text>
            <Text style={styles.itemCategoryText}>Food</Text>
            <Text style={styles.itemCategoryText}>02/09/2020</Text>
            </View>
            <View style={styles.itemColumn}>
                <Text style={styles.bigDateText}>3<Text style={styles.smallDateText}>d</Text></Text>
            </View>
        </View>
        
    </View>
    </View>
    );
}

const styles = StyleSheet.create({
    smallDateText:{
        fontSize: 20,
    },
    bigDateText:{
        flex: 1, 
        margin: 30,
        color: '#48A3D1',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: "center"
    },
    itemTitleText: {
        // flex: 1, 
        margin: 10,
        color: '#7E7676',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: "left"
      },
    itemCategoryText:{
        // flex: 1, 
        marginLeft: 10,
        color: '#7E7676',
        fontSize: 17,
        textAlign: "left",
        marginBottom: 50
    },
    titleContainer: {
        margin: 25,
      },
      generalInput: {
        backgroundColor: '#FFFFFF',
        height: 50,
        borderWidth: 1,
        borderRadius: 15,
        paddingLeft: 16,
        borderColor: '#F79E8E'
      },
      itemContainer:{
        backgroundColor: '#FFFFFF',
        height: 150,
        borderWidth: 1,
        borderRadius: 15,
        paddingLeft: 16,
        borderColor: '#F79E8E',
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
      },
      topicContainer: {
        margin: 25
      },
      topicText: {
        color: '#7E7676',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: "center",
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      itemColumn: {
        width: '50%' // is 50% of container width
      }
})
