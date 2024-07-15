import React from 'react';
import CustomToast, { BaseToast } from 'react-native-toast-message';
import colors from '../assets/colors';

const ToastMessage = ({ position }) => {

    const toastConfig = {
        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: colors.primary, borderLeftWidth: 7 }}
                contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: colors.secondary }}
                text1Style={{
                    fontSize: 15,
                    color: colors.primary,
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