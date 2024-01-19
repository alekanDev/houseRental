import * as Location from 'expo-location'
import { Alert } from 'react-native';

export const askForLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permiso de ubicación no concedido')
    return;
  }
}

export const getLocation = async () => {
  try {
    const location = await Location.getCurrentPositionAsync({})
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    })

    // console.log(reverseGeocode)

    const position = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.15,
      longitudeDelta: 0.15,
    }

    return { reverseGeocode, position }
  } catch (error) {
    console.error('Error al obtener la ubicación:', error);
  }
}