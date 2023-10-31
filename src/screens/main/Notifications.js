import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import SVGImage from '../../components/SVGImage'
import icons from '../../assets/icons'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../assets/colors'
import NotificationsCard from '../../components/NotificationsCard'
import { TodayNotifications, YesterdayNotifications } from '../../DummyData'

const Notifications = () => {
    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'Notifications'}
                icon={true}
            />
            <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.heading}>Today</Text>
                    <Text style={styles.read}>Mark As All Read</Text>
                </View>
                <View style={styles.notificationWrapper}>
                    {TodayNotifications.map((item) => (
                        <NotificationsCard
                            image={item.image}
                        />
                    ))}
                </View>
                <Text style={styles.heading}>Yesterday</Text>
                <View style={styles.notificationWrapper}>
                    {YesterdayNotifications.map((item) => (
                        <NotificationsCard
                            image={item.image}
                        />
                    ))}
                </View>
                <SVGImage
                    image={icons.pageEnd}
                    style={{ alignSelf: 'center' }}
                />
            </ScrollView>
        </Container>
    )
}

export default Notifications

const styles = StyleSheet.create({
    screen: {
        paddingTop: hp('0.1%'),
        paddingBottom: hp('15%'),
        padding: hp('2.5%')
    },
    heading: {
        color: colors.white,
        fontSize: hp('2.2%'),
        fontWeight: 'bold'
    },
    read: {
        color: colors.white,
        alignSelf: 'center',
        fontSize: hp('1.7%')
    },
    notificationWrapper: {
        paddingTop: hp('5%')
    }
})