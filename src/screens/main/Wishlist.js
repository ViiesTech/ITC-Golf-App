import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import images from '../../assets/images';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import Button from '../../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {getWishlistById} from '../../redux/actions/authAction';
import MerchandiseCard from '../../components/MerchandiseCard';

const Wishlist = () => {
  const {wishlist_items, wishlist_loader, user} = useSelector(
    state => state.AuthReducer,
  );

  const dispatch = useDispatch();

  console.log(user.user_id);

  useEffect(() => {
    if (wishlist_items?.length < 1) {
      dispatch(getWishlistById(user.user_id));
    }
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
        ) : wishlist_items?.length < 1 ? (
          <>
            <Image source={images.wishlist1} style={styles.image} />
            <Text style={styles.text}>Your Wishlist is Empty</Text>
            <Text style={styles.tap}>
              Tap heart button to start saving your favorite items.
            </Text>
          </>
        ) : (
          <FlatList
            data={wishlist_items}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <MerchandiseCard
              //   image={{uri: item.image}}
              //   text={item.title}
              //   favourite={item.isFav}
              //   desc={item.description}
              //   rating={item.ratings}
              // style={{marginLeft: hp('2.6%')}}
              //   onPress={() =>
              //     navigation.navigate('MerchandiseStack', {
              //       screen: 'MerchandiseDetails',
              //       params: {id: item.product_id, wishlist: item.isFav}
              //     })
              //   }
              />
            )}
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
    justifyContent: 'center',
    alignItems: 'center',
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
