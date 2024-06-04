import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
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
import UserCard from '../../components/UserCard';
import {useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';

const Payments = ({route}) => {
  const [state, setState] = useState({
    card_holder: '',
    card_number: '',
    exp_year: '',
    exp_month: '',
    cvc: '',
  });

  const {country, desc, address, city, email} = route.params 

  console.log('dataa from previous screen ======>', route.params);
  const {card} = useSelector(state => state.AuthReducer);

  const navigation = useNavigation();
  const sheetRef = useRef();

  const onCheckout = () => {};

  const onSelectCard = card => {
    setState({
      ...state,
      card_holder: card.card_holder,
      card_number: card.card_number,
      exp_year: card.exp_year,
      exp_month: card.exp_month,
      cvc: card.cvc,
    });
    sheetRef.current.close();
  };

  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Payment'} icon={true} />
      <ScrollView contentContainerStyle={styles.screen}>
        {/* <Text style={styles.heading}>Payment Method</Text> */}
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
            <Text style={styles.heading}>Select Card</Text>
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
            {/* {card..map(item => ( */}
            {card?.length > 0 && (
              <UserCard
                cardholder_name={
                  state.card_holder ? state.card_holder : card[0].card_holder
                }
                card_number={
                  state.card_number ? state.card_number : card[0].card_number
                }
                date={
                  state.exp_month && state.exp_year
                    ? state.exp_month + '/' + state.exp_year
                    : card[0].exp_month + '/' + card[0].exp_year
                }
                masterStyle={{width: '24%'}}
                onCardPress={() => sheetRef.current.open()}
              />
            )}
            {/* ))} */}
          </View>
          <RBSheet
            ref={sheetRef}
            height={400}
            draggable
            closeOnPressBack
            openDuration={250}
            customStyles={{
              container: {
                backgroundColor: colors.secondary,
                padding: hp(3),
                paddingTop: hp(7),
              },
            }}>
            <ScrollView
              scrollEnabled={card.length > 1 && true}
              showsVerticalScrollIndicator={false}>
              {card.map(item => (
                <View style={{marginBottom: hp('4%')}}>
                  <UserCard
                    cardholder_name={item.card_holder}
                    card_number={item.card_number}
                    date={item.exp_year + '/' + item.exp_month}
                    masterStyle={{width: '22%'}}
                    onCardPress={() => onSelectCard(item)}
                  />
                </View>
              ))}
            </ScrollView>
          </RBSheet>
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
    marginBottom: hp(2),
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
