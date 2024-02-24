import { StyleSheet, View, Text, Pressable, Image, Animated } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import React, { useEffect, useRef, useState } from 'react'
import { getLocation } from '../utils/helpers'
import SearchBar from '../components/SearchBar'
import axios from 'axios'

import { API_HOST } from '@env'


import { Octicons, MaterialIcons } from '@expo/vector-icons';

const initialLocation = {
  longitude: -75.575,
  latitude: 6.24,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02
}

const alfiler_small = require('../images/icons/alfiler_64.png')
const alfiler_medium = require('../images/icons/alfiler_96.png')
const alfiler_large = require('../images/icons/alfiler.png')

const Search = () => {
  const serverURL = 'http://192.168.100.29:5051'


  const [searchActive, setSearchActive] = useState(false)
  const [location, setLocation] = useState(initialLocation) // debe de inician en la vivienda seleccionada
  const [position, setPosition] = useState(null)
  const [reverseCode, setReverseCode] = useState({})
  const [alfiler, setAlfiler] = useState(alfiler_medium)
  const [housesData, setHousesData] = useState([])

  const myMarkers = [
    {
      longitude: -75.614911057055,
      latitude: 6.163475937986018,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02
    },
    {
      longitude: -75.575,
      latitude: 6.24,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02
    },
  ]

  const mapViewRef = useRef(null)
  useEffect(() => {
    miLocation()
    getRecomendations()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (position !== null) {
        setLocation(position)
      }
    }, 800);
  }, [position])

  const getRecomendations = async () => {
    await axios({
      method: 'get',
      url: `${ serverURL }/getHouses`,
      headers: {
        actiontype: 'getHouses'
      }
    })
      .then(response => {
        setHousesData(response.data)
      })
      .catch(err => console.log(err))
  }

  const miLocation = async () => {
    await getLocation()
      .then(data => {
        setPosition(data.position)
        setReverseCode(data.reverseGeocode[0])
      })
      .catch(err => {
        console.log(err)
      })
  }

  const MarkerSelected = ({ location }) => {
    const { latitude, longitude } = location
    return (
      <Marker
        coordinate={{
          latitude,
          longitude
        }}
        image={alfiler}
      />
    )
  }


  return (
    <View style={{ flex: 1 }}>

      <MapView
        style={{ flex: 1 }}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={initialLocation}
        region={location}
        ref={mapViewRef}
        onRegionChangeComplete={(e) => {
          // console.log(e)
          // setLocation(e)
          e.latitudeDelta >= 0.02 ? setAlfiler(alfiler_small) : setAlfiler(alfiler_medium)
          // mapViewRef.current?.animateToRegion(location, 1000)
        }}
        showsUserLocation={false}
      >
        {
          myMarkers.map((item, index) => (
            <MarkerSelected
              key={index}
              location={item}
            />
          ))
        }

      </MapView>

      <View style={{ width: '95%', height: searchActive ? '90%' : 120, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 15, padding: 10, alignSelf: 'center', position: 'absolute', top: 50, justifyContent: searchActive ? 'flex-start' : 'space-around' }} >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, height: 50 }} >
          <Octicons name="location" size={25} color="#CDDB30" />
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} >
            {reverseCode.city}, {reverseCode.region}
          </Text>
        </View>
        <View
          style={{ width: '100%', height: searchActive? '90%' : 70, justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 10, marginTop: 10 }}
          onPress={() => {
            console.log('mePresionaste')
          }}
        >
          <SearchBar
            searchActive={ searchActive }
            setSearchActive={setSearchActive}
            housesData= { housesData }
          />
        </View>
      </View>

      <View style={ searchActive ? { display: 'none' } : { width: '100%', height: 300, borderTopLeftRadius: 20, borderTopRightRadius: 20, position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.7)' } }>
        <Animated.ScrollView
          horizontal
          contentContainerStyle={{ width: 'auto', paddingTop: 25, paddingHorizontal: 10, paddingBottom: 10, gap: 10 }}
          pagingEnabled
          snapToInterval={340 + 10}
        >

          {
            housesData.map((item, index) => (
              <Pressable key={ index } style={{ width: 'auto', height: '100%' }} 
                onPress={ () => {
                  console.log(index)
                }}
              >
                <View style={{ width: 340, height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 25, padding: 10, gap: 5 }} >
                  <Image

                    style={{ width: '100%', height: '50%', alignSelf: 'center', borderRadius: 15, marginBottom: 10 }}
                  />
                  <Text style={{ color: '#CDDB30', fontWeight: 'bold', fontSize: 10 }}>
                    { item.type }
                  </Text>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Unidad del metro</Text>
                  <View style={{ alignItems: 'center', flexDirection: 'row', gap: 5 }} >
                    <Octicons name="location" size={14} color="#CDDB30" />
                    <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }} >{ item.city }, {item.state} </Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <View style={{ alignItems: 'center', flexDirection: 'row', gap: 5, alignItems: 'flex-end' }} >
                      <Text style={{ fontSize: 22, color: '#CDDB30', fontWeight: 'bold' }} >
                        {item.price}
                      </Text>
                      <Text style={{ color: 'white', fontSize: 12 }}> /mes</Text>
                    </View>
                    <Pressable onPress={() => {
                      setLikeActive(!likeActive)
                    }}>
                      <MaterialIcons name="favorite-outline" size={35} color={'white'} />
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            ))
          }
        </Animated.ScrollView>
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})