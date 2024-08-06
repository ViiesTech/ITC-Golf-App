import {Animated, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Container from '../../components/Container';
import SecondaryHeader from '../../components/SecondaryHeader';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import UserCard from '../../components/UserCard';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../assets/colors';
import Button from '../../components/Button';
import Add from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import ContactInput from '../../components/ContactInput';
import uuid from 'react-native-uuid';
import {createCard} from '../../redux/actions/authAction';
import {ShowToast} from '../../Custom';
import {
  identifyCardType,
  maxCardLength,
  validateCVC,
  validateExpiry,
} from '../../utils/HelperFunctions';
import ScrollGuide from '../../components/ScrollGuide';

const ManageCards = () => {
  const [state, setState] = useState({
    card_id: '',
    card_type: '',
    card_holder: '',
    card_number: '',
    exp_year: '',
    exp_month: '',
    cvc: '',
  });
  const [showArrow, setShowArrow] = useState(true)

  const sheetRef = useRef();
  const scrollY = useRef(new Animated.Value(0)).current
  const dispatch = useDispatch();

  const {card} = useSelector(state => state.AuthReducer);
  console.log('card details ====>', card);

  const onOpenSheet = () => {
    sheetRef.current.open();
    clearState();
  };

  const onTextChange = (value, text) => {
    setState({
      ...state,
      [value]: text,
    });
  };

  const clearState = () => {
    setState({
      ...state,
      card_id: '',
      card_holder: '',
      card_number: '',
      exp_month: '',
      exp_year: '',
      cvc: '',
    });
  };

  const onAddCard = () => {
    if (!state.card_holder) {
      return ShowToast('Please provide your card details');
    } else if (/\d/.test(state.card_holder)) {
      return ShowToast('Please enter valid name');
    } else if (identifyCardType(state.card_number) === 'Invalid') {
      return ShowToast('Please enter the valid card number');
    } else if (validateExpiry(state.exp_month, true) === 'Invalid month') {
      return ShowToast('Invalid Expiry Month');
    } else if (validateExpiry(state.exp_year, false) === 'Expired card') {
      return ShowToast('Card is expired');
    } else if (validateCVC(state.cvc) === 'Invalid cvc') {
      return ShowToast('Invalid CVC');
    } else {
      const cardExist = card?.find(item => item.card_id == state.card_id);
      if (cardExist) {
        // alert('or kesa hai');
        const updatedCard = card.map(item =>
          item.card_id === state.card_id
            ? {
                ...state,
                card_type:
                  identifyCardType(state.card_number) === 'AmericanExpress'
                    ? 'AmericanExpress'
                    : identifyCardType(state.card_number) === 'Mastercard'
                    ? 'Mastercard'
                    : 'Visa',
              }
            : item,
        );
        dispatch(createCard(updatedCard));
        sheetRef.current.close();
        return ShowToast('Card has been updated successfully');
      } else {
        state.card_id = uuid.v4();
        state.card_type =
          identifyCardType(state.card_number) === 'AmericanExpress'
            ? 'AmericanExpress'
            : identifyCardType(state.card_number) === 'Mastercard'
            ? 'Mastercard'
            : 'Visa';
        const newCard = [...card, state];
        dispatch(createCard(newCard));
        sheetRef.current.close();
        clearState();
      }
    }
  };

  const onOpenCardDetails = card => {
    setState({
      ...state,
      card_id: card.card_id,
      card_holder: card.card_holder,
      card_number: card.card_number,
      cvc: card.cvc,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
    });
    sheetRef.current.open();
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

  return (
    <Container>
      <Header />
      <SecondaryHeader text={'Manage Cards'} />
      <ScrollView
        contentContainerStyle={styles.screen}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        {card?.length > 0 &&
          card.map((item, i) => (
            <View style={{marginBottom: hp('8%')}}>
              <UserCard
                cardholder_name={item.card_holder}
                card_number={item.card_number}
                date={item.exp_month + '/' + item.exp_year}
                masterStyle={{width: '22%'}}
                onCardPress={() => onOpenCardDetails(item)}
              />
            </View>
          ))}
      </ScrollView>
      {showArrow && <ScrollGuide />}
      <TouchableOpacity
        style={styles.addCardButton}
        onPress={() => onOpenSheet()}>
        <Add name={'add'} color={colors.secondary} size={30} />
      </TouchableOpacity>
      <View style={styles.sheetWrapper}>
        <RBSheet
          ref={sheetRef}
          closeOnPressBack
          draggable
          height={400}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: colors.secondary,
              padding: hp(2),
            },
          }}>
          <ScrollView contentContainerStyle={{paddingBottom: hp('10%')}}>
            <ContactInput
              label={'Card Holder'}
              style={[
                styles.input,
                /\d/.test(state.card_holder) &&
                  state.card_holder.length > 0 && {
                    borderWidth: 1,
                    borderColor: colors.red,
                  },
              ]}
              placeholder={'Card Holder Name'}
              textColor={colors.white}
              onChangeText={text => onTextChange('card_holder', text)}
              value={state.card_holder}
            />
            <ContactInput
              label={'Card Number'}
              placeholder={'Card Number'}
              length={maxCardLength(identifyCardType(state.card_number))}
              style={[
                styles.input,
                identifyCardType(state.card_number) === 'Invalid' &&
                  state.card_number.length > 0 && {
                    borderColor: colors.red,
                    borderWidth: 1,
                  },
              ]}
              keyboardType={'numeric'}
              textColor={colors.white}
              onChangeText={text => onTextChange('card_number', text)}
              value={state.card_number}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: hp(3),
              }}>
              <ContactInput
                style={[
                  styles.inputStyle,
                  validateExpiry(state.exp_year, false) === 'Expired card' &&
                    state.exp_year.length > 0 && {
                      borderWidth: 1,
                      borderColor: colors.red,
                    },
                ]}
                onChangeText={text => onTextChange('exp_year', text)}
                value={state.exp_year}
                textColor={colors.white}
                length={2}
                // innerStyle={styles.input}
                keyboardType={'numeric'}
                label={'Expiry Year'}
                placeholder={'Year'}
              />
              <ContactInput
                style={[
                  styles.inputStyle,
                  validateExpiry(state.exp_month, true) === 'Invalid month' &&
                    state.exp_month.length > 0 && {
                      borderWidth: 1,
                      borderColor: colors.red,
                    },
                ]}
                // innerStyle={styles.input}
                keyboardType={'numeric'}
                label={'Expiry Month'}
                length={2}
                onChangeText={text => onTextChange('exp_month', text)}
                value={state.exp_month}
                textColor={colors.white}
                placeholder={'Month'}
              />
              <ContactInput
                keyboardType={'numeric'}
                style={[
                  styles.inputStyle,
                  validateCVC(state.cvc) === 'Invalid cvc' &&
                    state.cvc.length > 0 && {
                      borderWidth: 1,
                      borderColor: colors.red,
                    },
                ]}
                textColor={colors.white}
                label={'Cvc'}
                onChangeText={text => onTextChange('cvc', text)}
                placeholder={'Cvc'}
                length={3}
                value={state.cvc}
                innerStyle={styles.input}
              />
            </View>
            <View style={{alignItems: 'center', paddingTop: hp('4%')}}>
              <Button
                buttonText={state.card_id == '' ? 'Add Card' : 'Update Card'}
                textStyle={{color: colors.secondary}}
                buttonStyle={styles.cardButton}
                onPress={() => onAddCard()}
              />
            </View>
          </ScrollView>
        </RBSheet>
      </View>
    </Container>
  );
};

export default ManageCards;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    paddingTop: hp('4%'),
  },
  addCardButton: {
    borderWidth: 1,
    backgroundColor: colors.primary,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 60,
    right: 40,
    borderRadius: 100,
    height: hp('7%'),
    width: hp('7%'),
  },
  inputStyle: {
    width: hp(10),
    borderColor: colors.gray,
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  cardButton: {
    borderRadius: 100,
    width: hp(40),
  },
  input: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    borderWidth: 2,
    borderColor: colors.gray,
  },
});
