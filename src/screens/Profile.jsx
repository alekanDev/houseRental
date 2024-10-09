import { ImageBackground, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import background from '../images/appBackground.jpg';
import profile_pic from '../images/profile_pics/image_profile_male_01.png';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FormNewItem from '../components/modals/FormNewItem';
import React, { useState } from 'react';

const Profile = () => {
  const [modal_formView, setModal_formView] = useState(false)
  return (
    <ImageBackground style={styles.background} source={background}>
      <BlurView intensity={5} style={styles.blurContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.card}>
            <View style={styles.textContainer}>
              <Text style={styles.profile_name}> Alejandro Cano</Text>
              <Text style={styles.username}> alekanDev - root</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                resizeMode='cover' // Cambiar a 'cover' para llenar el contenedor
                source={profile_pic}
                style={styles.image}
              />
            </View>
          </View>
          <Pressable
            style={styles.btn_plus}
            onPress={() => {
              setModal_formView(true)
            }}
          >
            <FontAwesome6 name="house-medical" size={26} color="black" />
          </Pressable>
          <FormNewItem
            modal_formView={modal_formView}
            setModal_formView={setModal_formView}
          />
        </SafeAreaView>
      </BlurView>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: '100%',
  },
  blurContainer: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    paddingVertical: 50,
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: '95%',
    backgroundColor: '#2c2c2c',
    borderRadius: 15,
    height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 3,
    boxSizign: 'border-box',
    paddingLeft: 20
  },
  profile_name: {
    color: '#CDDB30',
    fontWeight: 'bold',
    fontSize: 28,
    width: '100%',
    height: 30
  },
  username: {
    width: '100%',
    color: '#CDDB30',
    fontSize: 16,
    height: 30,
    marginLeft: 10
  },
  perfil_user: {
    color: '#cddb30',
    marginLeft: 10,
    height: 30
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: '100%'
  },
  image: {
    width: '75%',
    height: '70%',
    borderRadius: 50,
    borderColor: '#CDDB30',
    borderWidth: 4
  },
  btn_plus: {
    width: 60,
    height: 60,
    backgroundColor: 'yellow',
    borderRadius: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
    elevation: 6
  }
});
