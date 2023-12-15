import Toast from 'react-native-toast-message'

export const ShowToast = (message) => {
    return Toast.show({
        type: 'success',
        text1: message
    })
}

export const ErrorToast = (message) => {
    return Toast.show({
        type: 'success',
        text1: message || "Some Problem Occured"
    })
}
