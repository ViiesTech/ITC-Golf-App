import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../assets/colors'
import Button from './Button'

const ConfirmationModal = ({ visible, onRequestClose, onPressOut, onCancel, onConfirm }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <TouchableOpacity style={styles.modalWrapper} onPress={onPressOut} activeOpacity={2}>
                <View style={styles.modalView}>
                    <Text style={styles.text}>Are you sure you want to logout!</Text>
                    <View style={styles.buttonWrapper}>
                        <Button
                            buttonText={'Cancel'}
                            buttonStyle={styles.cancelButton}
                            onPress={onCancel}
                            textStyle={{ color: colors.secondary }}
                        />
                        <Button
                            buttonText={'Confirm'}
                            onPress={onConfirm}
                            buttonStyle={styles.confirmButton}
                            textStyle={{ color: colors.secondary }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default ConfirmationModal

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(51, 51, 51, 0.5)'
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: colors.secondary,
        paddingVertical: 20,
        elevation: 6,
        borderRadius: 10,
        width: '80%',
        padding: hp('1%'),
    },
    text: {
        color: colors.white,
        fontSize: hp('2%')
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: hp('7%'),
        // backgroundColor: 'red',
        gap: 10,
    },
    cancelButton: {
        backgroundColor: colors.white,
        width: '45%'
    },
    confirmButton: {
        width: '45%'
    }
})