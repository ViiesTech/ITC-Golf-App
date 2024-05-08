import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import constant from '../../redux/constant';
import Sponsors from '../../components/Sponsors';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';

const FreeStuff = () => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {products_loading} = useSelector(state => state.ProductReducer);
  const {user, wishlist_items} = useSelector(state => state.AuthReducer);
  // console.log('from screen ======================>', products[0].isFav)

  useEffect(() => {
    // if (products.length < 1) {
    dispatch(getProducts(setProducts));
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
    if (products[index].favorite) {
      const remove = await dispatch(
        removeFromWishlist(user.user_id, item.product_id),
      );
      const updatedProducts = [...products];
      updatedProducts[index] = {...item, favorite: false};
      setProducts(updatedProducts);
      return ShowToast(remove.message);
      //  return alert('add to favourite');
    } else {
      //  return alert('remove from favourite');
      const add = await dispatch(addToWishlist(user.user_id, item.product_id));
      const updatedProducts = [...products];
      updatedProducts[index] = {...item, favorite: true};
      setProducts(updatedProducts);
      return ShowToast(add.message);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getProducts(setProducts));
      setRefreshing(false);
    }, 3000);
  };


  console.log('productsss', products);

  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Free Stuff Merchandise'} />
      <ScrollView
        contentContainerStyle={styles.screen}
        refreshControl={
          <RefreshControl
            onRefresh={() => handleRefresh()}
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
          />
        }>
        <FlatList
          data={products}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <MerchandiseCard
              image={
                item.image
                  ? {uri: item.image, priority: FastImage.priority.high}
                  : images.dummy
              }
              text={item.title}
              heartPress={() => onToggleWishlist(item, index)}
              favourite={item.favorite}
              desc={item.description}
              rating={item.ratings}
              // style={{marginLeft: hp('2.6%')}}
              onPress={() =>
                navigation.navigate('MerchandiseStack', {
                  screen: 'MerchandiseDetails',
                  params: {id: item.product_id, wishlist: item.favorite},
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
