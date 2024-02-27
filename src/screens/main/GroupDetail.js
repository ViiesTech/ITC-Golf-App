import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import colors from '../../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PersonalInfoTab from '../../components/PersonalInfoTab';
import {Tabs} from '../../DummyData';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import images from '../../assets/images';

const GroupDetail = ({route}) => {
  const [changeTab, setChangeTab] = useState(1);

  const {item} = route.params;
  console.log('detail ======>', item);

  return (
    <Container>
      <Header />
      <SecondaryHeader text={item.listing_title} link={true} />
      <View style={styles.screen}>
        <View style={styles.tabView}>
          {Tabs.map(item => (
            <PersonalInfoTab
              text={item.text}
              style={
                changeTab == item.id
                  ? [styles.active, {width: item.id == 2 ? '36%' : '55%'}]
                  : [styles.inactive, {width: item.id == 1 ? '55%' : '36%'}]
              }
              onPress={() => setChangeTab(item.id)}
              textStyle={changeTab == item.id && {marginTop: hp('0.3%')}}
            />
          ))}
        </View>
        <View style={styles.detailView}>
          <View style={styles.headingView}>
            <Image source={images.personal1} style={styles.image} />
            <Text style={styles.name}>{item.listing_title}</Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default GroupDetail;

const styles = StyleSheet.create({
  screen: {
    padding: hp('2%'),
  },
  tabView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: hp('2%'),
    paddingLeft: hp('1%'),
    flexDirection: 'row',
  },
  active: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  detailView: {
    paddingTop: hp('7%'),
  },
  headingView: {
    backgroundColor: colors.gray,
    padding: hp('2%'),
    borderRadius: 10,
  },
  image: {
    height: hp('15%'),
    position: 'absolute',
    marginLeft: hp('3%'),
    top: hp('-4%'),
    width: hp('15%'),
  },
  name: {
    color: colors.white,
    alignSelf: 'flex-end',
    marginRight: hp('8%'),
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
});
