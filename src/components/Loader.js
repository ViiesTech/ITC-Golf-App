import { ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '../assets/colors'

const Loader = ({ size, color }) => {
    return (
        <ActivityIndicator
            color={colors.white}
            size={size}
            style={{ alignSelf: 'center' }}
        />

    )
}

export default Loader
