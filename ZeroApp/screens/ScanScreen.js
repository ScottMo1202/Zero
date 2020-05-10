import React  from 'react';
import { Text, View, StyleSheet, Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import ScanInfoModal from './ScanInfoModal';
import Spinner from 'react-native-loading-spinner-overlay';
export default class ScanScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: 'granted',
      scanned: false,
      isLoading: false,
    }
  } 
  componentDidUpdate(){
    {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        this.setState({hasPermissions: status === 'granted'});
      })();
    }
  }
  render(){
  const { navigation } = this.props;
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     this.setState({hasPermissions: status === 'granted'});
  //   })();
  // }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // this.setState({scanned: true});
    this.setState({isLoading: true});
    fetch("https://api.upcitemdb.com/prod/trial/lookup?upc=" + data, {
      "method": "GET"
    })
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      this.setState({isLoading: false});
      navigation.navigate('Manual Input', {
        title: data.items[0].title
      })
    })
    .catch(err => {
      console.log(err);
    });
  };

  if (this.state.hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (this.state.hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // const handleRescan = () => {
  //   this.setState({scanned: false});
  // }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={this.state.isLoading}
        //Text with the Spinner
        textContent={'Barcode scanned!  Loading...'}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      <BarCodeScanner
        onBarCodeScanned={this.state.scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* {this.state.scanned && <Button title={'Tap to Scan Again'} onPress={handleRescan} />} */}
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  sanner: {
    margin: 100
  }
});
