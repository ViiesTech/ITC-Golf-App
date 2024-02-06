import { ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = ({ size, color }) => {
    return (
        <ActivityIndicator
            color={color}
            size={size}
            style={{ alignSelf: 'center' }}
        />

    )
}

export default Loader
