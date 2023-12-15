import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SecondaryHeader from '../../components/SecondaryHeader'
import SVGImage from '../../components/SVGImage'
import icons from '../../assets/icons'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../assets/colors'
import NotificationsCard from '../../components/NotificationsCard'
import { TodayNotifications, YesterdayNotifications } from '../../DummyData'
import images from '../../assets/images'

const Notifications = () => {
    const [notifications, setNotifications] = useState('')

    useEffect(() => {

        setNotifications(TodayNotifications)

    }, [])

    return (
        <Container>
            <Header />
            <SecondaryHeader
                text={'Notifications'}
                icon={true}
            />
            {notifications.length < 1 ?
                <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={images.notification}
                        style={styles.image}
                    />
                    <Text style={styles.text}>No Notifications</Text>
                </View>
                :
                <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.heading}>Today</Text>
                        <Text style={styles.read}>Mark As All Read</Text>
                    </View>
                    <View style={styles.notificationWrapper}>
                        {notifications?.map((item) => (
                            <NotificationsCard
                                image={item.image}
                            />
                        ))}
                    </View>
                    <Text style={styles.heading}>Yesterday</Text>
                    <View style={styles.notificationWrapper}>
                        {YesterdayNotifications?.map((item) => (
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
            }
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
    },
    image: {
        height: hp('34%'),
        width: hp('34%')
    },
    text: {
        color: colors.white,
        fontSize: hp('3%')
    }
})