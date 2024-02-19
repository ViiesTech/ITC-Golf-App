import { ActivityIndicator, FlatList, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import MerchandiseCard from '../../components/MerchandiseCard'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, getProducts } from '../../redux/actions/productAction'
import colors from '../../assets/colors'
import { ShowToast } from '../../Custom'
import constant from '../../redux/constant'
import Sponsors from '../../components/Sponsors'

const FreeStuff = () => {

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const { products, products_loading } = useSelector(state => state.ProductReducer)
    // console.log('from screen ======================>', isFavourite)

    useEffect(() => {
        if (products.length < 1) {
            dispatch(getProducts())
        }
    }, [])

    if (products_loading) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator
                    size={'large'}
                    color={colors.primary}
                />
            </View>
        )
    }

    const onToggleWishlist = async (item, index) => {
        const res = await dispatch(addToWishlist(item.product_id))
        if (res.success) {
            // console.log('hello world')
            products[index] = { ...item, isFav: true }
            dispatch({
                type: constant.RENDER_PRODUCT_DONE,
                payload: products
            })
            return ShowToast(res.message)
        }
    }

    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'Free Stuff Merchandise'}
            />
            <ScrollView contentContainerStyle={styles.screen}>
                <FlatList
                    data={products}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <MerchandiseCard
                            image={{ uri: item.image }}
                            text={item.title}
                            heartPress={() => onToggleWishlist(item, index)}
                            favourite={item.isFav}
                            desc={item.description}
                            rating={item.ratings}
                            onPress={() => navigation.navigate('MerchandiseStack', { screen: 'MerchandiseDetails', params: { id: item.product_id, wishlist: item.isFav } })}
                        />
                    )}
                />
                <Sponsors />
            </ScrollView>
        </Container>

    )
}

export default FreeStuff

const styles = StyleSheet.create({
    screen: {
        padding: hp('2.5%')
    },
    errorMessage: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: hp('2.4%')
    }
})