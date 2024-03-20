import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/Container';
import {GiftedChat, Send, Bubble, InputToolbar} from 'react-native-gifted-chat';
import colors from '../../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SendIcon from 'react-native-vector-icons/Feather';
import SecondaryHeader from '../../components/SecondaryHeader';
import {members} from '../../DummyData';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGroupMembers} from '../../redux/actions/groupAction';
import images from '../../assets/images';
import ChatMembers from '../../components/ChatMembers';
import { renderListingMembers } from '../../redux/actions/listingAction';

const GroupChat = ({route}) => {
  const [messages, setMessages] = useState([]);

  const {title, type, id} = route?.params;

  const dispatch = useDispatch();

  const {group_members} = useSelector(state => state.GroupReducer);
  const { listing_members } = useSelector(state => state.ListingReducer)
  const {user} = useSelector(state => state.AuthReducer);
  console.log('from chat screen', user);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
    renderGroupMembers();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = props => {
    return (
      <Send {...props} containerStyle={styles.sendButtonStyle}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: colors.primary,
            alignSelf: 'center',
            alignItems: 'center',
            padding: hp('0.8%'),
            borderRadius: 5,
            width: hp('13%'),
            // gap: 10,
          }}>
          <SendIcon name="send" color={colors.white} size={17} />
          <Text style={styles.sendText}>SEND</Text>
        </View>
      </Send>
    );
  };

  const renderInputToolbar = props => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.primary,
            borderRadius: 30,
            borderBottomRightRadius: 30,
            marginBottom: 10,
            padding: 5,
            right: 15,
            // justifyContent: 'flex-end',
            marginLeft: 0,
          },
          left: {
            backgroundColor: colors.white,
            borderRadius: 30,
            marginBottom: 20,
            padding: 5,
            left: -30,
          },
        }}
      />
    );
  };

  const renderGroupMembers = async () => {
    if (type == 'group') {
      await dispatch(fetchGroupMembers(7981));
    } else {
      await dispatch(renderListingMembers(8031))
    }
  };

  return (
    <Container>
      <View style={{paddingTop: hp('5%')}}>
        <SecondaryHeader text={title} />
      </View>
      <View style={{padding: hp('1%')}}>
        <View style={styles.memberContainer}>
          {/* <Text style={styles.memberText}>Members</Text> */}
          <FlatList
            data={type == 'group' ? group_members : listing_members}
            horizontal
            contentContainerStyle={{
              gap: hp('4%'),
              marginRight: hp('6%'),
              padding: hp('2%'),
            }}
            renderItem={({item, index}) => (
              <ChatMembers
                image={
                  item.author_img_url
                    ? {uri: item.author_img_url}
                    : images.profile
                }
                text={item.user_name}
              />
            )}
          />
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderSend={renderSend}
        renderBubble={renderBubble}
        alwaysShowSend
        textInputProps={{
          color: 'white',
          placeholderTextColor: 'white',
        }}
        renderInputToolbar={renderInputToolbar}
      />
    </Container>
  );
};

export default GroupChat;

const styles = StyleSheet.create({
  sendButtonStyle: {
    // backgroundColor: colors.primary,
    justifyContent: 'center',
    // flexDirection: 'row',
    // position: 'absolute',
    // right: ,
  },
  sendText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  bubbleView: {
    backgroundColor: colors.primary,
  },
  inputToolbar: {
    backgroundColor: colors.secondary,
    color: colors.white,
    padding: hp('0.5%'),
  },
  memberText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: hp('2%'),
    marginLeft: hp('3%'),
    marginBottom: hp('1.2%'),
  },
  memberContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
  },
});
