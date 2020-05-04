import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Span, Dimensions, ScrollView,Animated} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import firebase from '../components/firebase'

const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

const images = [
    require("../assets/images/feature_1.png"),
    require("../assets/images/feature_2.png")
]

export default class HomeScreen2 extends React.Component {
    numItems = images.length
    itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
    animVal = new Animated.Value(0)

    constructor(props) {
        super(props)
        const currUser = firebase.auth().currentUser;

        this.state = {
            assetsLoaded: false,
            currentUser: currUser ? currUser.uid : "None",
            currItems: []
        }
    }

    async componentDidMount() {
        // fetch items data from firebase
        this.itemsRef = firebase.database().ref('items');
        this.itemsRef.on('value', (content) => {
            let value = content.val();
            this.setState({currItems: value})
        });

        await Font.loadAsync({
            'muli-bold': require('../assets/fonts/Muli-Bold.ttf'),
            'muli-regular': require('../assets/fonts/Muli-Regular.ttf')
        });
        this.setState({assetsLoaded:true})
    }

    // the function to stop fetching data from firebase
    componentWillUnmount() {
        this.itemsRef.off();
    } 

    render() {
        const { navigation } = this.props;
        const {assetsLoaded} = this.state
        let imageArray = []

        function handleNavigation(e) {
            e.preventDefault();
            navigation.navigate("Manual Input")
        }

        images.forEach((image, i) => {
            // console.log(image, i)
            const thisImage = (
            <TouchableOpacity onPress={(e) => handleNavigation(e)}>
                <Image
                    key={`image${i}`}
                    source={image}
                    style={{ width: deviceWidth * 2/3, borderRadius: 15, marginRight: 15, marginVertical: 10 }}
                />

                <View style={styles.contentContainer}>
                    <View style={styles.whatson}>
                        <Text style={{fontSize: 15, fontFamily: 'muli-bold', color:'#8B7777'}}>Manually record expiration dates</Text>
                    </View>
                </View>
            </TouchableOpacity>
          )
          imageArray.push(thisImage)
        })

        if (assetsLoaded) {
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <View style={styles.intro}>
                            <Text style={[styles.title]}>Zero, an eco-friendly lifestyle.</Text>
                        </View>

                        <View style={styles.contentContainer}>
                            <View style={[styles.whatson, {paddingLeft: 25}]}>
                                <Text style={{fontSize: 20, fontFamily: 'muli-bold', color:'#8B7777'}}>What's on Zero:</Text>
                            </View>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={10}
                            pagingEnabled
                            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.animVal } } }])}
                            style={{paddingLeft: 25}}
                        >
                            {imageArray}
                        </ScrollView>
                    </ScrollView>

                    <ItemSection currItems={this.state.currItems} currentUser={this.state.currentUser}/>
                </View>
            )
        } else {
            return null
        }
    }
}

class ItemSection extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currItems: this.props.currItems,
            currentUser: this.props.currentUser
        }

        this.getMinLeftDate = this.getMinLeftDate.bind(this);
    }

    // function to get the minimum leftDate 
    getMinLeftDate(items) {
        let minDays = 10000000000000000;
        items.map((item) => {
            if (item.leftDate < minDays && item.currentUser == this.props.currentUser) {
                minDays = item.leftDate;
            }
        });

        return minDays;
    }

    render() {
        if (this.props.currItems == null) {
            return (
                <View>
                    <View>
                        <Text>
                            You have no upcoming expiration dates
                        </Text>
                    </View>
                    <View>
                        <Text>
                            Navigate to the menu below to record a new item.
                        </Text>
                    </View>
                </View>
            );
        }

        // create new items with leftDate 
        let items = Object.keys(this.props.currItems).map((eachKey) => {
            let eachItem = this.props.currItems[eachKey];
            const dateDiff = new Date(eachItem.expireDate).getTime() - new Date().getTime(); 
            const daysDiff = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
            eachItem.id = eachKey;
            eachItem.leftDate = daysDiff;

            return eachItem;
        });

        // get the item(s) with minimum leftDate
        const minDays = this.getMinLeftDate(items);
        let displayedItems = items.filter((item) => {
            if (item.leftDate == minDays && String(item.currentUser) == this.props.currentUser) {
                return item;
            }
        });

        // show all the items
        let itemLst = displayedItems.map((eachItem) => {
            return <ItemInfo key={eachItem.id} 
                            itemName={eachItem.title} 
                            categName={eachItem.category} 
                            note={eachItem.note}
                            expireDate={String(eachItem.expireDate)}
                            leftDate={eachItem.leftDate}
                    />
        });

        return (
            <View>
                <View>
                    <Text>
                        Your upcoming expiration dates 
                    </Text>
                </View>

                {itemLst}
            </View>
        );
    }
}

// for each displayed item
class ItemInfo extends React.Component {
    render() {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemColumn}>
                <Text style={styles.itemTitleText}>{this.props.itemName}</Text>
                <Text style={styles.itemCategoryText}>{this.props.categName}</Text>
                <Text style={styles.itemNoteText}>{this.props.note}</Text>
                <Text style={styles.itemCategoryText}>{this.props.expireDate}</Text>
                </View>
                <View style={styles.itemColumn}>
                    <Text style={styles.bigDateText}>{this.props.leftDate}<Text style={styles.smallDateText}>d</Text></Text>
                </View>
            </View>
        );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    intro: {
        paddingTop: 0,
        width: deviceWidth,
        height: 100,
        backgroundColor: '#80CEAC'
    },
    title: {
        paddingTop: 59,
        paddingLeft: 25,
        fontSize: 20,
        fontFamily: 'muli-bold',
        color: '#FFFFFF'
    },
    contentContainer: {
        paddingTop: 0,
        // height: 273,
        shadowColor: '#00000029',
        shadowOpacity: 1.0,
        shadowOffset: {
            width: 2,
            height: 0
        },
        shadowOpacity: 1.0
    },
    whatson: {
        // paddingLeft: 25,
        paddingTop: 8
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
    itemColumn: {
        width: '50%' // is 50% of container width
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
    itemNoteText: {
        marginLeft: 12,
        color: '#A9A9A9',
        marginBottom: 26
    },
    bigDateText:{
        flex: 1, 
        margin: 30,
        color: '#48A3D1',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: "center"
    },
    smallDateText:{
        fontSize: 20,
    }
})