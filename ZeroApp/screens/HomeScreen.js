import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Span } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              require('../assets/icons/homepage.png')
            }
            style={styles.welcomeImage}
          />
        </View>
        <Text style={[styles.getStartedText, styles.slogan]}>Zero, an eco-friendly lifestyle.</Text>
        <View style={styles.homescreenBox}>
            <Text style={styles.listText}>With Zero, you can:</Text>
            <View style={styles.listView}>
            <View style={{flexDirection: 'row'}}><Text style={styles.bulletPoint}>{'\u2022'}</Text><Text style={styles.listText}>Mark expiration dates</Text></View>
            <View style={{flexDirection: 'row'}}><Text style={styles.bulletPoint}>{'\u2022'}</Text><Text style={styles.listText}>Get automatic notifications</Text></View>
            <View style={{flexDirection: 'row'}}><Text style={styles.bulletPoint}>{'\u2022'}</Text><Text style={styles.listText}>Scan barcodes & receipts</Text></View>
            <View style={{flexDirection: 'row'}}><Text style={styles.bulletPoint}>{'\u2022'}</Text><Text style={styles.listText}>Manage waste habits</Text></View>
            </View>
        </View>
        <Text style={styles.getStartedText}>You have no upcoming expiration dates</Text>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  rowView:{
    flex: 1,
    flexDirection:'row',
    flexWrap:'wrap'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    // marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    height:200,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    marginBottom: 20,
  },
  slogan: {
    color: '#F79E8E',
  },
  listText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    marginLeft: 20,
    flex: 1, 
    marginBottom: 10,
  },
  listView: {
    marginLeft: 20,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  bulletPoint: {
    color: '#48A3D1',
    marginLeft: 20
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  homescreenBox: {
    // backgroundColor: "#FFF5F3",
    // width: '100%',
    // height: 200,
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    // alignItems: 'flex-start',
    backgroundColor: '#FFF5F3',
    paddingVertical: 30,
    marginBottom: 20,
  }
});