import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './navigation/tabs'

import { askForLocationPermission, getLocation } from './src/utils/helpers'

const App = () => {

    useEffect(() => {
      askForLocationPermission();
    }, [])

  return (
    <NavigationContainer>
      <StatusBar style="auto"  />
        <Tabs />
    </NavigationContainer>

  )
}

export default App