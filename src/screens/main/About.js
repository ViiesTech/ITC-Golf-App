import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import SecondaryHeader from '../../components/SecondaryHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../assets/images';
import colors from '../../assets/colors';
import {useDispatch, useSelector} from 'react-redux';
import {AboutSection} from '../../redux/actions/homeAction';

const About = () => {
  const dispatch = useDispatch();

  const {about_description, about_loader} = useSelector(
    state => state.HomeReducer,
  );

  // console.log(about_description)

  useEffect(() => {
    if (about_description == '') {
      getAboutData();
    }
  }, []);

  const getAboutData = async () => {
    await dispatch(AboutSection());
  };

  return (
    <Container>
      <Header />
      <SecondaryHeader text={'About-Us'} />
      {about_loader ? (
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
          style={{marginVertical: hp('5%')}}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.screen}
          showsVerticalScrollIndicator={false}>
          <Image
            source={images.about1}
            style={styles.image}
            borderRadius={10}
          />
          <View style={{paddingTop: hp('3%')}}>
            <Text style={styles.aboutText}>{about_description}</Text>
            <View style={styles.imageWrapper}>
              <Image
                source={images.about2}
                style={styles.image2}
                borderRadius={10}
              />
              <View>
                <Image
                  source={images.about3}
                  style={styles.image3}
                  borderRadius={10}
                />
                <Image
                  source={images.about4}
                  style={[styles.image3, {marginTop: hp('1%')}]}
                  borderRadius={10}
                />
              </View>
            </View>
            {/* <Text style={styles.heading}>About-Us</Text>
                    <View style={{ paddingTop: hp('3%') }}>
                        <Text style={styles.aboutText}>Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt.{'\n'}{'\n'}{'\n'}

                            Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum. Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet.{'\n'}{'\n'}{'\n'}

                            Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum.{'\n'}{'\n'}{'\n'}

                            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt.{'\n'}{'\n'}{'\n'}
                            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt. {'\n'}{'\n'}{'\n'}

                            Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum. Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet.{'\n'}{'\n'}{'\n'}

                            Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum.{'\n'}{'\n'}{'\n'}

                            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt.
                        </Text>
                    </View> */}
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default About;

const styles = StyleSheet.create({
  screen: {
    padding: hp('2%'),
    paddingBottom: hp('10%'),
  },
  image: {
    height: hp('24%'),
    width: '98%',
  },
  aboutText: {
    color: colors.white,
  },
  imageWrapper: {
    paddingTop: hp('5%'),
    flexDirection: 'row',
  },
  image2: {
    height: hp('21%'),
    width: '54%',
  },
  image3: {
    height: hp('10%'),
    marginLeft: hp('2%'),
    width: hp('17%'),
  },
  heading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2.7%'),
    marginTop: hp('4%'),
  },
});
