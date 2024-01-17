import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Foundation, Feather, MaterialIcons, MaterialCommunityIcons , AntDesign } from '@expo/vector-icons';

import HomeScreen from '../src/screens/Home'
import Search from '../src/screens/Search'
import Favorites from '../src/screens/Favorites'
import Messages from '../src/screens/Messages'
import Profile from '../src/screens/Profile'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return(
    <Tab.Navigator
      initialRouteName="Home"
      // tabBar={() => null} // Ocultar barra de navegacion
      screenOptions={{ 
        headerShown: false, // ocultar barra superior
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#2c2c2c',
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarActiveTintColor: '#CDDB30',
        tabBarInactiveTintColor: 'white',
        size: 35,
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen name='Home' component={ HomeScreen } 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" size={ size } color={ color } />
          ), 
        }}
      />
      <Tab.Screen name='Search' component={ Search } 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={ size } color={ color } />
          ),
          tabBarStyle: {
            display: 'none'
          }
        }}
      />
      <Tab.Screen name='Favorites' component={ Favorites } 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-outline" size={ size } color={ color } />
          )
        }}
      />
      <Tab.Screen name='Messages' component={ Messages }
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-reply-text-outline" size={ size } color={ color } />
          )
        }}
      />
      <Tab.Screen name='Profile' component={ Profile } 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={ size } color={ color } />
          )
        }}
      />

    </Tab.Navigator>
  )
}

export default Tabs