import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,  Keyboard,
  TouchableWithoutFeedback } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

//Alan things 
import ReactDOM from 'react-dom';
import { isMobile } from 'react-device-detect';
import alanBtn from "@alan-ai/alan-sdk-web";
import { Link } from '@react-navigation/native';
//import { Redirect } from 'react-router-dom';


// Key for alan
const alanKey = '81c38e61708769f036394d63ca557ae32e956eca572e1d8b807a3e2338fdd0dc/stage';

export default function MapScreen() {
  const [pin, setPin] = useState({
    latitude: 1.3521,
    longitude: 103.8198,
  });
  const [locationName, setLocationName] = useState('');
  const [showMaps, setShowMaps] = useState(false);

  useEffect(() => {
    fetchLocationName();
  }, [pin]);

  //Alan?
  // const alan = () => {
  //     useEffect(() => {
  //       alanBtn({
  //           key: alanKey,
  //           onCommand: ({ command }) => {
  //               if(command === 'testCommand'){
  //                   alert('This code was executed');
  //               }
  //               if(command === 'whatisAlan'){
  //                   alert('This is alan');
  //               }
  //               if(command === 'redirectMap'){
  //                   <Redirect to='/screens\MapScreen.tsx' />
  //               }
  //           }
            
  //       })
  //     }, [])
  // }

  const fetchLocationName = async () => {
    try {
      const response = await Geocoder.from(pin.latitude, pin.longitude);
      const address = response.results[0].formatted_address;
      setLocationName(address);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceSelect = (data, details) => {
    const { geometry } = details;
    const { location } = geometry;

    setPin({
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const HomePage = ({ setShowMaps }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>AIRIS</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowMaps(true)}
        >
          <Text style={styles.buttonText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Camera button pressed')}
        >
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Settings button pressed')}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const MapsPage = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          fetchDetails={true}
          onPress={handlePlaceSelect}
          query={{
            key: 'AIzaSyBelJa2AUe2d03PRRENsQLBBNVAg7PpPJw',
            language: 'en',
            components: 'country:SG',
            types: 'establishment',
            radius: 30000,
            location: '',
          }}
          styles={{
            container: { position: 'absolute', width: '100%', zIndex: 1 },
            listView: { backgroundColor: 'white' },
          }}
        />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 1.3521,
            longitude: 103.8198,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider='google'
        >
          <Marker
            coordinate={pin}
            pinColor='purple'
            draggable={true}
            onDragStart={(e) => {
              console.log('Drag start', e.nativeEvent.coordinate);
            }}
            onDragEnd={(e) => {
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
          >
            <Callout>
              <Text>{locationName}</Text>
            </Callout>
          </Marker>
          <Circle center={pin} radius={1500} />
          <TouchableOpacity
            style={styles.circle}
            onPress={() => setShowMaps(false)}
          />
        </MapView>
      </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      {showMaps ? (
        <MapsPage />
      ) : (
        <HomePage setShowMaps={setShowMaps} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: 200,
    height: 100,
    backgroundColor: 'pink',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    left: 90
    
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  circle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'purple',
    bottom: 20,
    alignSelf: 'center',
  },
});
