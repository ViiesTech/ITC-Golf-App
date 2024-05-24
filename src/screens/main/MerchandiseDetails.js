import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import StuffDetailCard from '../../components/StuffDetailCard';
import Button from '../../components/Button';
import colors from '../../assets/colors';
import AddMinus from '../../components/AddMinus';
import MerchandiseCard from '../../components/MerchandiseCard';
import images from '../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {getProductDetails} from '../../redux/actions/productAction';
import {ShowToast} from '../../Custom';
import FastImage from 'react-native-fast-image';

const MerchandiseDetails = ({route}) => {
  const [product_detail, setProduct_detail] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const {id} = route.params;
  console.log('product idd params ==========>', relatedProducts);

  const dispatch = useDispatch();

  const {product_detail_loading} = useSelector(state => state.ProductReducer);

  useEffect(() => {
    dispatch(getProductDetails(id, setProduct_detail, setRelatedProducts));
  }, []);


  if (product_detail_loading) {
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

  const renderItem = ({item}) => {
    return (
      <MerchandiseCard
              image={{uri: item.image}}
              desc={item.description}
              text={item.title}
              hideFav={true}
              onPress={() => onProductPress(item.product_id)}
            />
    )
  }

  const onProductPress = (id) => {
    dispatch(getProductDetails(id, setProduct_detail, setRelatedProducts))
  }



  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Free Stuff Merchandise'} />
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}>
        <StuffDetailCard
          title={product_detail.title}
          image={
            product_detail.image
              ? {
                  uri: product_detail.image,
                  priority: FastImage.priority.high,
                }
              : images.dummy
          }
          desc={product_detail.description}
        />
        <View style={styles.wrapper}>
          <View style={{flexDirection: 'row'}}>
            <Button
              buttonText={'Add To Cart'}
              textStyle={styles.buttonText}
              buttonStyle={styles.button}
              onPress={() => {
                return ShowToast('Coming soon');
              }}
            />
            {/* <Button
              buttonText={'Book Now'}
              textStyle={styles.button2Text}
              buttonStyle={styles.button2}
              onPress={() => {
                return ShowToast('Coming soon');
              }}
            /> */}
          </View>
          <View style={{marginLeft: hp('2%')}}>
            <Text style={styles.price}>$99.00</Text>
            <View style={{paddingTop: hp('1%')}}>
              <AddMinus />
            </View>
          </View>
        </View>
        <View style={styles.border} />
        <Text style={styles.heading}>Related Products</Text>
        {/* <View
          style={{
            paddingTop: hp('4%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}> */}
            <FlatList 
              data={relatedProducts}
              contentContainerStyle={{paddingTop: hp('1%')}}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              renderItem={renderItem}
            />
          {/* <MerchandiseCard
            image={images.stuff4}
            imageStyle={{height: hp('18%'), width: '54%'}}
            style={{}}
            onPress={() => {
              return ShowToast('Coming Soon');
            }}
            desc={'Lorem Ipsum Dolor Sit Amet, Consetetur'}
            descStyle={{top: hp('27.5%')}}
            text={'Golf Tees'}
          /> */}
        {/* </View> */}
      </ScrollView>
    </Container>
  );
};

export default MerchandiseDetails;

const styles = StyleSheet.create({
  screen: {
    padding: hp('1%'),
    paddingTop: hp('5%'),
  },
  wrapper: {
    paddingTop: hp('4%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 100,
    // width: hp('25%'),
  },
  button2: {
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: colors.white,
    borderRadius: 100,
    width: hp('15%'),
    marginLeft: hp('1%'),
  },
  buttonText: {
    fontSize: hp('2%'),
    color: colors.secondary,
  },
  button2Text: {
    fontSize: hp('2%'),
  },
  price: {
    color: colors.white,
    marginLeft: hp('4%'),
    fontWeight: 'bold',
  },
  border: {
    borderBottomWidth: 1,
    marginTop: hp('5%'),
    borderBottomColor: colors.gray,
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    paddingTop: hp('4%'),
    fontSize: hp('2.5%'),
  },
});
