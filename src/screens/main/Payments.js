import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import SVGImage from '../../components/SVGImage';
import icons from '../../assets/icons';
import Arrow from 'react-native-vector-icons/SimpleLineIcons';
import PaymentMethods from '../../components/PaymentMethods';
import {methods} from '../../utils/DummyData';
import Button from '../../components/Button';
import Add from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Payments = ({route}) => {
  const {country, desc, address, city, email} = route.params;

  console.log('dataa from previous screen ======>', route.params);

  const navigation = useNavigation();

  const onCheckout = () => {};

  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Payment'} icon={true} />
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.heading}>Payment Method</Text>
        <View style={styles.locationWrapper}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.locationView}>
              <SVGImage image={icons.marker} />
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.street}>{address}</Text>
              <Text style={styles.locationText}>
                {city}, {country}
              </Text>
            </View>
          </View>
          <Arrow
            name={'arrow-right'}
            color={colors.lightgray}
            size={20}
            style={{alignSelf: 'center'}}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.border} />
        <View style={{paddingTop: hp('4%')}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.heading}>Payment Method</Text>
            {/* <Text style={styles.walletText}>Use E-Wallet</Text> */}
            <Add
              name={'add'}
              color={colors.white}
              size={25}
              style={{alignSelf: 'center'}}
              onPress={() =>
                navigation.navigate('SecondaryStack', {screen: 'ManageCards'})
              }
            />
          </View>
          <View style={styles.methodWrapper}>
            {methods.map(item => (
              <PaymentMethods key={item.id} icon={item.icon} text={item.text} />
            ))}
          </View>
          <Button
            textStyle={{color: colors.secondary}}
            buttonText={'Check Out'}
            buttonStyle={{borderRadius: 100}}
            onPress={() => onCheckout()}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default Payments;

const styles = StyleSheet.create({
  screen: {
    paddingTop: hp('0.1%'),
    paddingBottom: hp('8%'),
    padding: hp('2.5%'),
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2.5%'),
  },
  locationWrapper: {
    paddingTop: hp('3.5%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: hp('2.5%'),
  },
  locationView: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    height: hp('7%'),
    width: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    marginLeft: hp('1.5%'),
    marginTop: hp('0.8%'),
  },
  street: {
    color: colors.white,
    fontSize: hp('1.9%'),
    fontWeight: 'bold',
  },
  locationText: {
    color: colors.white,
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    marginTop: hp('0.3%'),
  },
  border: {
    borderBottomColor: colors.lightgray,
    borderBottomWidth: 0.5,
    marginTop: hp('2%'),
  },
  methodWrapper: {
    padding: hp('2.3%'),
    paddingTop: hp('4.5%'),
  },
  walletText: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: hp('1.7%'),
  },
  amountWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountHeading: {
    color: colors.white,
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
  },
  priceText: {
    color: colors.white,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: hp('1.9%'),
    marginRight: hp('1.4%'),
  },
});
