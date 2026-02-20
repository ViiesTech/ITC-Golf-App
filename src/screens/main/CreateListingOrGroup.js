import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import colors from '../../assets/colors';
import SecondaryHeader from '../../components/SecondaryHeader';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

const CreateListingOrGroup = ({route}) => {
  const [showArrow, setShowArrow] = useState(true);
  const navigation = useNavigation();

  // console.log('changeTab =======>', changeTab);

  return (
    <Container>
      <Header />
      <ScrollView
        contentContainerStyle={[styles.wrapper]}
        showsVerticalScrollIndicator={false}>
        <SecondaryHeader text={'Create Listing or Group'} />

        <View style={styles.buttonRow}>
          <Button
            buttonText={'Add New Listing'}
            onPress={() =>
              navigation.navigate('SecondaryStack', {
                screen: 'AllGroups',
                params: {options: 'Add New Listings'},
              })
            }
            buttonStyle={styles.button}
            textStyle={styles.textStyle}
          />

          <Button
            buttonText={'Add New Group'}
            onPress={() =>
              navigation.navigate('SecondaryStack', {
                screen: 'AllGroups',
                params: {options: 'Add New Groups'},
              })
            }
            buttonStyle={styles.button}
            textStyle={styles.textStyle}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default CreateListingOrGroup;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: hp('1.5%'),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: hp('2%'),
    marginTop: hp('3%'),
  },
  button: {
    width: '45%',
    borderRadius: 30,
  },
  textStyle: {
    color: colors.white,
    fontSize: hp('1.8%'),
  },
});
