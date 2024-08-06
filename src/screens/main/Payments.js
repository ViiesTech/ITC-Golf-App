import {StyleSheet, Text, View, ScrollView, Animated} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import {payment} from '../../redux/actions/authAction';
import {ShowToast} from '../../Custom';
import {STRIPE_KEY} from '../../redux/constant';
import ScrollGuide from '../../components/ScrollGuide';
var stripe = require('stripe-client')(STRIPE_KEY);

const Payments = ({route}) => {
  const [showArrow, setShowArrow] = useState(true);
  const {card, payment_loading, user} = useSelector(state => state.AuthReducer);

  const scrollY = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState({
    card_holder: card[0]?.card_holder,
    card_number: card[0]?.card_number,
    exp_month: card[0]?.exp_month,
    exp_year: card[0]?.exp_year,
    cvc: card[0]?.cvc,
    card_type: card[0]?.card_type,
  });

  const [checkMethod, setCheckMethod] = useState({
    type: '',
    value: false,
  });

  const {country, desc, address, city} = route.params;

  const {cart} = useSelector(state => state.ProductReducer);

  console.log('dataaaa', checkMethod.type !== state.card_type);
  console.log('dataa state ======>', state);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const sheetRef = useRef();

  const onCheckout = async () => {
    if (
      !state.card_number ||
      !state.exp_month ||
      !state.exp_year ||
      !state.cvc ||
      !state.card_holder ||
      card?.length < 1
    ) {
      return ShowToast('Please Select your card');
    } else if (checkMethod.type == '') {
      return ShowToast('Please select the payment method');
    } else if (checkMethod.type !== state.card_type) {
      return ShowToast(
        'The selected card does not match the chosen payment method',
      );
    } else {
      const product = cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: Math.round(item.price * 100) / 100,
      }));

      var information = {
        card: {
          number: state.card_number,
          exp_month: state.exp_month,
          exp_year: state.exp_year,
          cvc: state.cvc,
          name: state.card_holder,
        },
      };

      var card = await stripe.createToken(information);
      var token = card.id;

      // return  console.log('stripe tokennnnn =======>', information);
      const res = await dispatch(
        payment(user.user_id, user.user_email, desc, token, product),
      );
      if (res) {
        navigation.navigate('Home');
        return ShowToast('Payment Successful');
      } else {
        return ShowToast('An error occurred while processing your payment!');
      }
    }
  };

  const onSelectCard = card => {
    setState({
      ...state,
      card_holder: card.card_holder,
      card_number: card.card_number,
      exp_year: card.exp_year,
      exp_month: card.exp_month,
      cvc: card.cvc,
      card_type: card.card_type,
    });
    sheetRef.current.close();
  };

  const onBoxCheckPress = item => {
    setCheckMethod({
      ...checkMethod,
      value: !checkMethod.value,
      type: item.type,
    });
  };

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

  // console.log('carddd', state);

  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Payment'} icon={true} />
      <ScrollView
        contentContainerStyle={styles.screen}
        scrollEventThrottle={16}
        onScroll={handleScroll}>
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
            {card?.length > 0 ? (
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
                    : card[0].exp_year + '/' + card[0].exp_month
                }
                masterStyle={{width: '24%'}}
                cardStyle={{alignSelf: 'center'}}
                onCardPress={() => sheetRef.current.open()}
              />
            ) : (
              <Text
                style={{
                  alignSelf: 'center',
                  color: colors.white,
                  fontSize: hp('2.4'),
                }}>
                No Cards in your wallet
              </Text>
            )}
            {/* ))} */}
          </View>
          <View style={styles.border} />
          <View style={[styles.methodWrapper, {padding: 0}]}>
            <Text style={styles.heading}>Payment Method</Text>
            <View style={{paddingTop: hp(5)}}>
              {methods.map(item => (
                <PaymentMethods
                  key={item.id}
                  text={item.text}
                  icon={item.icon}
                  isChecked={item.type == checkMethod.type && checkMethod.value}
                  onChecked={() => onBoxCheckPress(item)}
                />
              ))}
            </View>
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
              scrollEnabled={card?.length > 1 && true}
              showsVerticalScrollIndicator={false}>
              {card?.map(item => (
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
            indicator={payment_loading}
            onPress={() => onCheckout()}
          />
        </View>
      </ScrollView>
      {showArrow && <ScrollGuide />}
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
    borderBottomWidth: 0.6,
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
