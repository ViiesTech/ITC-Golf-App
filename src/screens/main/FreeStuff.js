import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import MerchandiseCard from '../../components/MerchandiseCard';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToWishlist,
  getProducts,
  removeFromWishlist,
} from '../../redux/actions/productAction';
import colors from '../../assets/colors';
import {ShowToast} from '../../Custom';
import constant from '../../redux/constant';
import Sponsors from '../../components/Sponsors';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';

const FreeStuff = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {products, products_loading} = useSelector(
    state => state.ProductReducer,
  );
  const {user} = useSelector(state => state.AuthReducer);
  // console.log('from screen ======================>', isFavourite)

  useEffect(() => {
    // if (products.length < 1) {
      dispatch(getProducts());
    // }
  }, []);

  if (products_loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.secondary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  }

  const onToggleWishlist = async (item, index) => {
    const add = await dispatch(addToWishlist(user.user_id, item.product_id));
    const remove = await dispatch(
      removeFromWishlist(user.user_id, item.product_id),
    );
    if (add.success && !products[index].isFav) {
      //   alert('add to favourite');
      products[index] = {...item, isFav: true};
      dispatch({
        type: constant.RENDER_PRODUCT_DONE,
        payload: products,
      });
      return ShowToast(add.message);
    } else if (remove.success && products[index].isFav) {
      //   alert('remove from favourite');
      products[index] = {...item, isFav: false};
      dispatch({
        type: constant.RENDER_PRODUCT_DONE,
        payload: products,
      });
      return ShowToast(remove.message);
    }
  };

  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Free Stuff Merchandise'} />
      <ScrollView contentContainerStyle={styles.screen}>
        <FlatList
          data={products}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <MerchandiseCard
              image={item.image ? {uri: item.image, priority: FastImage.priority.high} : images.dummy}
              text={item.title}
              heartPress={() => onToggleWishlist(item, index)}
              favourite={item.isFav}
              desc={item.description}
              rating={item.ratings}
              // style={{marginLeft: hp('2.6%')}}
              onPress={() =>
                navigation.navigate('MerchandiseStack', {
                  screen: 'MerchandiseDetails',
                  params: {id: item.product_id, wishlist: item.isFav},
                })
              }
            />
          )}
        />
        <Sponsors />
      </ScrollView>
    </Container>
  );
};

export default FreeStuff;

const styles = StyleSheet.create({
  screen: {
    padding: hp('1.7%'),
  },
  errorMessage: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: hp('2.4%'),
  },
});
