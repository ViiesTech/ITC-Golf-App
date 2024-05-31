import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';

const AddToProductCard = ({
  image,
  name,
  price,
  quantity,
  increment,
  decrement,
}) => {
  //   console.log('image=-=>', image);
  //   console.log('image=-=>', price);
  //   console.log('image=-=>', name);
  //   console.log('image=-=>', quantity);
  //   console.log('image=-=>', increment);
  //   console.log('image=-=>', decrement);
  return (
    <View style={styles.productQuantityBox}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}>
        <View
          style={{
            width: 70,
            height: 70,
          }}>
          <Image
            source={image}
            resizeMode="cover"
            style={{width: '100%', height: '100%', borderRadius: 15}}
          />
        </View>
        <View style={{justifyContent: 'center', width: '55%'}}>
          <Text style={{color: '#fff', fontSize: hp('1.7%')}}>{name}</Text>
          <Text
            style={{
              color: '#efefef',
              fontSize: hp('1.5%'),
              marginTop: 2,
            }}>
            ${price}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={decrement}
          style={styles.button}
          activeOpacity={0.9}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantityButton}>
          <Text style={styles.quantityText}>{quantity}</Text>
        </View>
        <TouchableOpacity
          onPress={increment}
          style={styles.button}
          activeOpacity={0.9}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddToProductCard;

const styles = StyleSheet.create({
  productQuantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 0.5,
    borderColor: colors.white,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: '7%',
    backgroundColor: '#020116',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  button: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.white,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.white,
  },
  quantityButton: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.white,
  },
  quantityText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
