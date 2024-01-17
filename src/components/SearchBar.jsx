import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import { Octicons, Ionicons } from '@expo/vector-icons';

const SearchBar = (getSet) => {
  const { setSearchActive } = getSet

  const [findValue, setFindValue] = useState('')

  return (
    <View style={{ width: '98%', height: 50, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 15, alignItems: 'center', paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', width: '80%', height: '100%', alignItems: 'center' }}>
        <Octicons name="search" size={25} color="#CDDB30" />
        <TextInput
          style={{ color: 'white', fontSize: 18, marginLeft: 10, width: '100%', height: '100%', marginLeft: 10 }} placeholder='Buscar...'
          placeholderTextColor={'gray'}
          onChangeText={(value) => {
            setSearchActive(true)
            setFindValue(value)
          }}
          returnKeyType='search'
          cursorColor={'#CDDB30'}
          onEndEditing={() => {
            console.log(findValue)
            setSearchActive(false)
          }}
        />
      </View>
      <Ionicons name="arrow-forward" size={24} color="#CDDB30" onPress={() => { console.log(findValue) }} />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})