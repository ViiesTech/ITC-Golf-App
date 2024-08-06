import {
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import Sponsors from '../../components/Sponsors';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';
import {getWishlistById} from '../../redux/actions/authAction';
import {ShowToast} from '../../Custom';
import constant from '../../redux/constant';
import ScrollGuide from '../../components/ScrollGuide';

const FreeStuff = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [showArrow, setShowArrow] = useState(true);

  const scrollY = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {products_loading, products} = useSelector(
    state => state.ProductReducer,
  );
  const {user} = useSelector(state => state.AuthReducer);
  // console.log('from screen ======================>', products[0].isFav)

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
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
      listener: event => {
        const currentOffsetY = event.nativeEvent.contentOffset.y;
        setShowArrow(currentOffsetY < 100);
      },
    },
  );

  const onToggleWishlist = async (item, index) => {
    if (products[index].favorite) {
      const remove = await dispatch(
        removeFromWishlist(user.user_id, item.product_id),
      );
      const updatedProducts = [...products];
      updatedProducts[index] = {...item, favorite: false};
      dispatch({
        type: constant.RENDER_PRODUCT_DONE,
        payload: updatedProducts,
      });
      return ShowToast(remove.message);
      //  return alert('add to favourite');
    } else {
      //  return alert('remove from favourite');
      const add = await dispatch(addToWishlist(user.user_id, item.product_id));
      const updatedProducts = [...products];
      updatedProducts[index] = {...item, favorite: true};
      dispatch({
        type: constant.RENDER_PRODUCT_DONE,
        payload: updatedProducts,
      });
      return ShowToast(add.message);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(async () => {
      try {
        await dispatch(getWishlistById(user.user_id));
        await dispatch(getProducts());
      } catch (error) {
        console.log('refreshing error', error);
        return ShowToast('Some problem occured');
      } finally {
        setRefreshing(false);
      }
    }, 3000);
  };

  // console.log('productsss', products);

  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Free Stuff Merchandise'} />
      <ScrollView
        contentContainerStyle={styles.screen}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
                  params: {id: item.product_id},
                })
              }
            />
          )}
        />
        <Sponsors />
      </ScrollView>
      {showArrow &&
        <ScrollGuide />
      }
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
