import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import MerchandiseCard from '../../components/MerchandiseCard'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { stuff } from '../../DummyData'
import SVGImage from '../../components/SVGImage'
import icons from '../../assets/icons'
import { useNavigation } from '@react-navigation/native'

const FreeStuff = () => {

    const navigation = useNavigation()

    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'Free Stuff Merchandise'}
            />
            <View style={styles.screen}>
                <FlatList
                    data={stuff}
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: hp('34%') }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item, index }) => (
                        <MerchandiseCard
                            image={item.image}
                            text={item.text}
                            onPress={() => navigation.navigate('MerchandiseStack', { screen: 'MerchandiseDetails' })}
                        />
                    )}
                />
            </View>
            <SVGImage image={icons.pageEnd} style={{ alignSelf: 'center' }} />
        </Container>

    )
}

export default FreeStuff

const styles = StyleSheet.create({
    screen: {
        padding: hp('2%')
    }
})