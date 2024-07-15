import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import colors from '../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const StuffDetailCard = ({image, title, desc}) => {
  // const [chooseOptions, setChooseOptions] = useState(0)
  const rotateValue = useSharedValue(0);

  const {height: screenHeight} = Dimensions.get('window');
  const initialHeight = screenHeight * 0.245;

  const startAnimation = () => {
    rotateValue.value = withTiming(
      1,
      {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      },
      () => {
        rotateValue.value = withTiming(0, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        });
      },
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = `${rotateValue.value * -14}deg`;
    const scale = 1 + rotateValue.value * 0.1;
    const height = initialHeight - rotateValue.value * (initialHeight * 0.1); 
    return {
      transform: [{scale}, {rotate}],
      height,
    };
  });

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.cardStyle}
        activeOpacity={0.9}
        onPress={startAnimation}>
        <Animated.View style={animatedStyle}>
          <FastImage
            source={image}
            resizeMode={FastImage.resizeMode.cover}
            style={[styles.image]}
          />
        </Animated.View>
        {/* <View style={styles.heartView}>
                    <Heart
                        name={favourite ? 'heart' : 'hearto'}
                        size={17}
                        color={colors.secondary}
                    />
                </View> */}
      </TouchableOpacity>
      <View style={styles.textWrapper}>
        <Text style={[styles.text, {}]}>{title}</Text>
        {/* <StarRating
                    starSize={15}
                    style={{ marginTop: hp('1.7%') }}
                    rating={rating}
                    onChange={() => null}
                /> */}
        <Text style={styles.desc}>
          {desc !== '' ? desc : 'Lorem Ipsum Dolor Sit Amet, Consetetur'}
        </Text>
        <View style={[styles.border, {}]} />
        {/* <View style={{ paddingTop: hp('2%'), flexDirection: 'row' }}>
                    {Colors.map((item, i) => (
                        <ColorOptions
                            style={chooseOptions == i ? { backgroundColor: colors.gray, borderWidth: 0 } : { backgroundColor: 'transparent',  }}
                            onPress={() => setChooseOptions(i)}
                            image={item.image}
                        />
                    ))}
                </View> */}
      </View>
    </View>
  );
};

export default StuffDetailCard;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  cardStyle: {
    backgroundColor: colors.gray,
    borderRadius: 10,
    width: '46%',
    height: hp(27),
    padding: hp('1%'),
  },
  image: {
    height: hp('24.5%'),
    // position: 'absolute',
    alignSelf: 'center',
    borderRadius: 10,
    // bottom: hp('3%'),
    width: '100%',
  },
  heartView: {
    backgroundColor: colors.primary,
    position: 'absolute',
    borderRadius: 5,
    right: hp('1.7%'),
    top: hp('-0.6%'),
    padding: hp('1%'),
    alignItems: 'center',
    marginTop: hp('2.6%'),
    justifyContent: 'center',
  },
  textWrapper: {
    marginLeft: hp('1%'),
    flex: 3,
    marginTop: hp('1%'),
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  desc: {
    color: colors.lightgray,
    // width: '60%',
    marginTop: hp('2%'),
  },
  border: {
    borderBottomColor: colors.lightgray,
    borderBottomWidth: 0.5,
    marginTop: hp('1.7%'),
  },
});
