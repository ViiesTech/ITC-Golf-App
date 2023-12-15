import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ListingDetailCard from '../../components/ListingDetailCard'
import { Group } from '../../DummyData'

const Groups = () => {
    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'Groups'}
            />
            <View style={styles.screen}>
                <FlatList
                    data={Group}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: hp('35%') }}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <ListingDetailCard
                            image={item.image}
                            hideTag
                        />
                    )}
                />
            </View>
        </Container>
    )
}

export default Groups

const styles = StyleSheet.create({
    screen: {
        padding: hp('3%'),
        paddingTop: hp('2%')
    }
})