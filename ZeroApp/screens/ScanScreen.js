import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ScanInfoModal from './ScanInfoModal';
import Spinner from 'react-native-loading-spinner-overlay';
export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState();
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsLoading(true);
    fetch("https://api.upcitemdb.com/prod/trial/lookup?upc=" + data, {
      "method": "GET"
    })
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      setIsLoading(false);
      setModalVisible(true);
      setData(data.items[0]);
    })
    .catch(err => {
      console.log(err);
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleRescan = () => {
    setScanned(false);
    setModalVisible(false);
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      {modalVisible && <ScanInfoModal data={data}/>}
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={isLoading}
        //Text with the Spinner
        textContent={'Barcode scanned!  Loading...'}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={handleRescan} />}
    </View>
  );
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
