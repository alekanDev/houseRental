import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, Pressable, Image, ScrollView, KeyboardAvoidingView } from 'react-native'
import { BlurView } from 'expo-blur'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'

import { optionButtoms } from '../utils/optionsMenu'
import SearchBar from '../components/SearchBar'

import houseIcon from '../images/icons/houseIcon.png'
import apartmentIcon from '../images/icons/apartmentIcon.png'

import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { getLocation } from '../utils/helpers'

const Home = () => {

  const [housesData, setHousesData] = useState([{ saludo: 'hola' }])
  const [currentLocation, setCurrentLocation] = useState({})
  const [likeActive, setLikeActive] = useState(false)

  const background = require('../images/appBackground.jpg')

  const selectIcon = (icon) => {
    switch (icon) {
      case 'house':
        return houseIcon
      case 'apartment':
        return apartmentIcon
      default:
        console.log('errorIcon')
        break
    }
  }

  useEffect(() => {
    myLocation()
    getRecomendations()
  }, [])
  
  const myLocation = async() => {
    await getLocation()
   .then(data => {
    // console.log(data.reverseGeocode[0])
     setCurrentLocation(data.reverseGeocode[0])
   })
   .catch(err => {
     console.log(err)
   })
 }  

  const getRecomendations = async () => {
    await axios({
      method: 'get',
      url: 'http://192.168.100.25:5050/getHouses',
      headers: {
        actiontype: 'getHouses'
      }
    })
      .then(response => {
        setHousesData(response.data)
      })
      .catch(err => console.log(err))
  }
 
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >

    <ImageBackground style={{ flex: 1, position: 'relative', height: '100%' }} source={background} >
      <BlurView intensity={5} style={{ flex: 1 }} >

        <SafeAreaView style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1, paddingVertical: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '10%', alignItems: 'center', paddingHorizontal: 15 }} >
            <View>
              <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                <Text style={{ fontSize: 16, color: 'white' }} >Ubicación</Text>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
              </View>
              <View style={{ alignItems: 'center', flexDirection: 'row' }} >
                <Octicons name="location" size={25} color="#CDDB30" />
                <Text style={{ fontSize: 18, marginLeft: 10, color: 'white', fontWeight: 'bold' }} >
                  { currentLocation.city }, { currentLocation.region }
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Pressable
                style={{ backgroundColor: '#2c2c2c', borderRadius: 50, padding: 7 }}
                onPress={() => {
                  console.log('notificationsList')
                }} >
                <MaterialIcons name="notifications" size={35} color="white" />
              </Pressable>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '15%', paddingHorizontal: 5 }} >
            <SearchBar />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', width: '100%', height: '20%' }} >
            {
              optionButtoms.map((item, index) => (
                <Pressable key={index} style={{ backgroundColor: 'rgba(0,0,0,0.4)', height: 100, width: 100, borderRadius: 25, alignItems: 'center', justifyContent: 'center' }} onPress={() => { console.log(item.name) }} >
                  <Image source={selectIcon(item.name)} style={{ width: 50, height: 50 }} />
                  <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }} >{item.title}</Text>
                </Pressable>
              ))
            }
          </View>
          <View style={{ height: '70%', width: '100%', paddingTop: 50 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', width: '100%', height: '5%', alignSelf: 'flex-end', paddingHorizontal: 10 }} >Recomendaciones</Text>

            <ScrollView
              horizontal={true}
              contentContainerStyle={{ width: 'auto', padding: 5, gap: 10 }}
            >
              {
                housesData.map((item, index) => (
                  <View key={ index } style={{ width: 'auto', height: '95%' }} >
                    <View style={{ width: 230, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 25, padding: 10, gap: 5 }} >
                      <Image

                        style={{ width: '100%', height: '50%', alignSelf: 'center', borderRadius: 15, marginBottom: 10 }}
                      />
                      <Text style={{ color: '#CDDB30', fontWeight: 'bold', fontSize: 10 }}>
                        { item.type }
                      </Text>
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Unidad del metro</Text>
                      <View style={{ alignItems: 'center', flexDirection: 'row', gap: 5 }} >
                        <Octicons name="location" size={14} color="#CDDB30" />
                        <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }} >{ item.city }, { item.state}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 5, alignItems: 'flex-end' }} >
                          <Text style={{ fontSize: 22, color: '#CDDB30', fontWeight: 'bold' }} >
                            { item.price }
                          </Text>
                          <Text style={{ color: 'white', fontSize: 12 }}> /mes</Text>
                        </View>
                        <Pressable onPress={() => {
                          setLikeActive(!likeActive)
                        }}>
                          <MaterialIcons name="favorite-outline" size={35} color={likeActive ? '#CDDB30' : 'white'} />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                ))
              }
            </ScrollView>

          </View>
        </SafeAreaView>

      </BlurView>
    </ImageBackground>
    </KeyboardAvoidingView>

  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
})