import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import images from '../../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import {useSelector, useDispatch} from 'react-redux';
import {getWishlistById} from '../../redux/actions/authAction';
import MerchandiseCard from '../../components/MerchandiseCard';
import {useNavigation} from '@react-navigation/native';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([])
  const {wishlist_loader, user} = useSelector(
    state => state.AuthReducer,
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  console.log('itemss ',wishlistItems);

  useEffect(() => {
    // if (wishlist_items?.length < 1) {
    dispatch(getWishlistById(user.user_id, setWishlistItems));
    // }
  }, []);

  return (
    <Container>
      <Header />
      <SecondaryHeader icon={true} text={'Wishlist'} />
      <View style={styles.screen}>
        {wishlist_loader ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              backgroundColor: colors.secondary,
            }}>
            <ActivityIndicator size={'large'} color={colors.primary} />
          </View>
        ) : wishlistItems?.message ? (
          <>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={images.wishlist1} style={styles.image} />
              <Text style={styles.text}>Your Wishlist is Empty</Text>
              <Text style={styles.tap}>
                Tap heart button to start saving your favorite items.
              </Text>
            </View>
          </>
        ) : (
          <FlatList
            data={wishlistItems}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              console.log('favvv', item.isFav);
              return (
                <MerchandiseCard
                  image={{uri: item.product_image}}
                  text={item.product_name}
                  favourite={true}
                  desc={item.product_desc ? item.product_desc : 'Lorem ipsum'}
                  //   rating={item.ratings}
                  // style={{marginLeft: hp('2.6%')}}
                  onPress={() =>
                    navigation.navigate('MerchandiseStack', {
                      screen: 'MerchandiseDetails',
                      params: {id: item.product_id, wishlist: true},
                    })
                  }
                />
              );
            }}
          />
        )}
        {/* <Button
          buttonStyle={styles.button}
          buttonText={'Add Now'}
          textStyle={{color: colors.black}}
        /> */}
      </View>
    </Container>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: hp('2%'),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    height: hp('18%'),
    width: hp('18%'),
  },
  text: {
    color: colors.white,
    marginTop: hp('5%'),
    fontWeight: 'bold',
    fontSize: hp('2.8%'),
  },
  tap: {
    color: colors.white,
    marginTop: hp('2.4%'),
    fontSize: hp('1.9%'),
  },
  button: {
    marginTop: hp('6%'),
    width: '80%',
    borderRadius: 100,
  },
});
