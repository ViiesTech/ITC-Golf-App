import React from 'react';
import CustomToast, { BaseToast } from 'react-native-toast-message';
import colors from '../assets/colors';

const ToastMessage = ({ position }) => {

    const toastConfig = {
        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: colors.secondary, borderLeftWidth: 7 }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 15,
                    fontWeight: '400'
                }}
            />
        ),
    }

    return (
        <CustomToast
            config={toastConfig}
            position={position}
            visibilityTime={3000}
        />
    )

}

export default ToastMessage;