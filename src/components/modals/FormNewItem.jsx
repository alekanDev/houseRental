import { StyleSheet, Text, Modal, View, BackHandler, Pressable } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react'

const FormNewItem = ({ modal_formView, setModal_formView }) => {
    return (
        <Modal
            visible={modal_formView}
            transparent={true}
            animationType='slide'
        >
            <View style={styles.modal_container}>
                <View style={styles.modal_style} >
                    <Text>FormNewItem</Text>
                    <Pressable
                        style={styles.btn_close_form}
                        onPress={() => {
                            setModal_formView(!modal_formView)
                        }}
                    >
                        <FontAwesome name="close" size={24} color="black" />
                    </Pressable>

                </View>

            </View>
        </Modal>
    )
}

export default FormNewItem

const styles = StyleSheet.create({
    modal_container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modal_style: {
        width: '98%',
        height: '75%',
        backgroundColor: '#2c2c2c',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 15,
        elevation: 5
    },
    btn_close_form: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#CDDB30',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12
    }
})