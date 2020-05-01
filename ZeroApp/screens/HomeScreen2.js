import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Span, Dimensions, ScrollView,Animated} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
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
        const { navigation } = this.props;
        const {assetsLoaded} = this.state
        let imageArray = []
        function handleNavigation(e) {
            e.preventDefault();
            navigation.navigate("Manual Input")
        }
        images.forEach((image, i) => {
          console.log(image, i)
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
        if(assetsLoaded) {
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
                            onScroll={
                                Animated.event(
                                [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
                                )
                            }
                            style={{paddingLeft: 25}}
                            >

                            {imageArray}
                            </ScrollView>
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
})