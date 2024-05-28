import {View, Text, ScrollView, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AddToProductCard from '../../components/AddToProductCard';
import {productData} from '../../components/AddToCardData';
import colors from '../../assets/colors';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const AddToCart = () => {
    const navigation = useNavigation();
  //   const onIncreaseQuantity = (item) => {
  //     return {
  //       quantity: item.quantity + 1,
  //     };
  //   };

  //   const onDecreaseQuantity = (item) => {
  //     return {
  //       quantity: item.quantity + 1,
  //     };
  //   };
  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Add To Cart'} />
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}>
        <FlatList
          contentContainerStyle={{width: '90%', alignSelf: 'center'}}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          data={productData}
          renderItem={({item}) => {
            //   <View style={{backgroundColor: 'green'}}>
            //     <Text style={{color: 'red'}}>dcdc</Text>
            //   </View>;
            //   console.log('item=-=-=>', item.title);
            return (
              <AddToProductCard
                image={item.image}
                name={item.title}
                quantity={item.quantity}
                price={item.price}
                // increment={() => onIncreaseQuantity(item)}
                // decrement={() => onDecreaseQuantity(item)}
              />
            );
          }}
        />
        <View style={styles.lineA} />
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentContainerText}>Payment Summary</Text>
          <View style={styles.summaryDetailsContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemTitleText}>Sub Total</Text>
              <Text style={styles.summaryItemTitleText}>$250</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemTitleText}>Total</Text>
              <Text style={styles.summaryItemTitleText}>$250</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonText={'Proceed To Checkout'}
            textStyle={styles.buttonText}
            buttonStyle={styles.button}
            onPress={() =>
              navigation.navigate('SecondaryStack', {screen: 'Checkout'})
            }
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default AddToCart;

const styles = StyleSheet.create({
  screen: {
    padding: hp('1%'),
    paddingVertical: hp('5%'),
    // backgroundColor:'red'
  },
  line: {
    borderColor: colors.white,
    borderWidth: 0.8,
  },
  lineA: {
    borderColor: colors.white,
    borderWidth: 0.8,
    width: '90%',
    alignSelf: 'center',
    marginVertical: hp('2%'),
  },
  paymentContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: hp('1%'),
  },
  paymentContainerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
  },
  summaryDetailsContainer: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: colors.white,
    padding: 10,
    borderRadius: 15,
    marginTop: hp('3%'),
    backgroundColor: '#020116',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomWidth: 0.5,
    // borderColor: '#D49621',
    padding: 10,
  },
  summaryItemLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  summaryItemTitleText: {
    color: '#efefef',
    fontSize: hp('1.8%'),
  },
  summaryItemTotalTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  summaryItemTotalPrice: {
    color: '#D49621',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  buttonContainer: {
    marginTop: hp('5%'),
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: hp('2%'),
    color: colors.secondary,
  },
  button: {
    borderRadius: 100,
  },
});
