import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import firebase from '../components/firebase'
import { render } from 'react-dom';

export default class ListScreen extends React.Component {
  constructor(props) {
    super(props);
    const currUser = firebase.auth().currentUser;

    this.viewItem = this.viewItem.bind(this);
    this.state = {
      text: 'Search',
      currentUser: currUser ? currUser.uid : "None",
      currItems: []
    };
  }

  // fetch items data from firebase 
  async componentDidMount() {
    this.itemsRef = firebase.database().ref('items');
    this.itemsRef.on('value', (content) => {
      let value = content.val();
      this.setState({currItems: value})
    });
    this.itemsRef.on('child_removed', (content) => {
      let value = content.val();
      this.setState({currItems: value})
    });
  }

  // the function to stop fetching data from firebase
  componentWillUnmount() {
    this.itemsRef.off();
  } 

  viewItem(title, category) {
    this.props.navigation.navigate('theItem', {
      title: title,
      category: category
    })
  }

  render() {
    // if the user has not stored any item
    // show initialized information
    if (this.state.currItems == null) {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <TextInput
              style = {styles.generalInput}
              placeholder = "Search"
              placeholderTextColor = '#7E7676'
              onChangeText = {(text) => {this.setState({...this.state, text: text})}}
              value={this.state.text}
              >
            </TextInput>
  
            <View style={styles.topicContainer}>
              <Text style={styles.topicText}>
                My Expiration Dates
              </Text>
            </View>
  
            <View>
              <Text style={styles.noItem}>
                It is time to track your items :)
              </Text>
            </View>
  
          </View>
        </View>
      );
      
    }

    // append all the group data to groupItems
    let items = Object.keys(this.state.currItems).map((eachKey) => {
      let eachItem = this.state.currItems[eachKey];
      eachItem.id = eachKey;
      return eachItem;
    });

    // items only contains the item with user as members
    let displayedItems = items.filter((item) => {
      if (item.currentUser == this.state.currentUser) {
        return item;
      }
    });

    // if the users has some items
    // show all the items
    let eachItem = displayedItems.map((eachItem) => {
      console.log("List")
      console.log(eachItem.id)
      return <ItemInfo    navi = {this.props.navigation}
                          theKey={eachItem.id} 
                          user={this.state.currentUser}
                          itemName={eachItem.title} 
                          categName={eachItem.category} 
                          note={eachItem.note}
                          purchaseDate={eachItem.purchaseDate}
                          expireDate={eachItem.expireDate}
                />
    });

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TextInput
            style = {styles.generalInput}
            placeholder = "Search"
            placeholderTextColor = '#7E7676'
            onChangeText = {(text) => {this.setState({...this.state, text: text})}}
            value={this.state.text}
            >
          </TextInput>

          <View style={styles.topicContainer}>
            <Text style={styles.topicText}>
              My Expiration Dates
            </Text>
          </View>

          {eachItem}

        </View>
      </View>
    );
  }
}

// for each displayed item
class ItemInfo extends ListScreen {
  constructor(props) {
    super(props)
  }
  viewItem() {
    console.log('Hello'); 
  }
  render() {
    const dateDiff = new Date(this.props.expireDate).getTime() - new Date().getTime(); 
    const daysDiff = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    
    return (
      <TouchableOpacity onPress={() => { this.props.navi.navigate('theItem', {
        user: this.props.user,
        theKey: this.props.theKey,
        title: this.props.itemName,
        category: this.props.categName,
        num: daysDiff,
        unit: 'day',
        expireDate: this.props.expireDate,
        purchaseDate: this.props.purchaseDate,
        note: this.props.note
      })}}>
        <View style={styles.itemContainer}>

            <View style={styles.itemColumn}>
            <Text style={styles.itemTitleText}>{this.props.itemName}</Text>
            <Text style={styles.itemCategoryText}>{this.props.categName}</Text>
            <Text style={styles.itemNoteText}>{this.props.note}</Text>
            <Text style={styles.itemCategoryText}>{this.props.expireDate}</Text>
            </View>
            <View style={styles.itemColumn}>
                <Text style={styles.bigDateText}>{daysDiff}<Text style={styles.smallDateText}>d</Text></Text>
            </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    smallDateText:{
        fontSize: 20,
    },
    bigDateText:{
        flex: 1, 
        margin: 30,
        color: '#48A3D1',
        fontSize: 36,
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
        marginBottom: 5
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
        alignItems: 'flex-start',
        marginBottom: 15
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
      },
      noItem: {
        textAlign: "center",
        fontSize: 20,
        color: '#A9A9A9'
      },
      itemNoteText: {
        marginLeft: 12,
        color: '#A9A9A9',
        marginBottom: 26
      }
})