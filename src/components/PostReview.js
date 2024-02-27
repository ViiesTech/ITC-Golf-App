import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating-widget';

const PostReview = ({text}) => {
  const [rating, setRating] = useState(0);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.reviewText}>{text}</Text>
      <View style={{alignItems: 'flex-end', paddingTop: hp('1%')}}>
        <StarRating
          rating={rating}
          starSize={12}
          onChange={value => setRating(value)}
        />
      </View>
      <View style={styles.line} />
    </View>
  );
};

export default PostReview;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: hp('4%'),
  },
  reviewText: {
    color: colors.white,
    fontSize: hp('1.5%'),
  },
  line: {
    borderBottomColor: colors.white,
    marginTop: hp('1%'),
    borderBottomWidth: 0.5,
  },
});
