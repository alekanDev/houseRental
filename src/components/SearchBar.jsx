import { StyleSheet, TextInput, View, Text, Pressable, Image, ScrollView } from 'react-native'
import short from 'short-uuid'
import React, { useState, useEffect } from 'react'

import { Octicons, Ionicons } from '@expo/vector-icons';

const SearchBar = (getSet) => {
  const { searchActive, setSearchActive, housesData } = getSet

  const [dataFound, setDataFound] = useState(housesData)
  const [optFilter, setOptFilter] = useState('type')

  return (
    <>
      <Pressable
        style={{ width: '98%', height: 50, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 15, alignItems: 'center', paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}

      >
        <View style={{ flexDirection: 'row', width: '80%', height: '100%', alignItems: 'center' }}>
          <Octicons name="search" size={25} color="#CDDB30" />
          <TextInput
            style={{ color: 'white', fontSize: 18, marginLeft: 10, width: '100%', height: '100%', marginLeft: 10 }} placeholder='Buscar...'
            placeholderTextColor={'gray'}
            onFocus={() => {
              setSearchActive(true)
              setDataFound(housesData)
            }}
            onChangeText={(value) => {
              setDataFound(housesData.filter(item => item[optFilter].toLowerCase().includes(value.toLowerCase())))
            }}
            returnKeyType='search'
            cursorColor={'#CDDB30'}
            onEndEditing={() => {
              setSearchActive(false)
            }}
          />
        </View>
        <Ionicons name="arrow-forward" size={24} color="#CDDB30" onPress={() => { console.log(findValue) }} />
      </Pressable>
      <ScrollView style={{ width: '100%', height: 'auto', maxHeight: '100%', display: searchActive ? 'flex' : 'none', padding: 10 }}>
        {
          dataFound.map((el, index) => (
            <Pressable
              key={Math.random() * (3561 - 4715) + index}
              onPress={() => {
                console.log(index)
              }}
              style={{ width: '100%', height: 70, paddingTop: 10, paddingHorizontal: 25, flexDirection: 'row', gap: 15 }}
            >
              <Image
                style={{ width: '20%', height: 50, backgroundColor: 'black', borderRadius: 5 }}
              />
              <View style={{ flexDirection: 'column' }}>
                <Text key={Math.random() * (3561 - 4715) + 3561} style={{ color: 'white', width: '100%', fontWeight: 'bold', fontSize: 16, color: '#CDDB30' }}  >{el.type}</Text>
                <Text key={index} style={{ color: 'white', width: '100%' }}  >  <Octicons name="location" size={12} color="#CDDB30" /> {el.city}, {el.state}</Text>
              </View>
            </Pressable>
          ))
        }

      </ScrollView>
    </>
  )
}

export default SearchBar

const styles = StyleSheet.create({})