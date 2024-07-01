import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/Container';
import {GiftedChat, Send, Bubble, InputToolbar} from 'react-native-gifted-chat';
import colors from '../../assets/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SendIcon from 'react-native-vector-icons/Feather';
import SecondaryHeader from '../../components/SecondaryHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchGroupMembers,
  groupMessages,
  sendGroupMessage,
} from '../../redux/actions/groupAction';
import images from '../../assets/images';
import ChatMembers from '../../components/ChatMembers';
import {
  ListingMessages,
  renderListingMembers,
  sendListingMessage,
} from '../../redux/actions/listingAction';

const GroupChat = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [chatLoader, setChatLoader] = useState(false);

  const {title, type, listing_id} = route?.params;

  const dispatch = useDispatch();

  const {group_members} = useSelector(state => state.GroupReducer);
  const {listing_members} = useSelector(state => state.ListingReducer);
  const {user} = useSelector(state => state.AuthReducer);
  // console.log('group members =======>', group_members);
  // console.log('listing members ======>', listing_members);

  useEffect(() => {
    const interval = setInterval(() => {
      renderChatHistory();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    renderChatMembers();
  }, []);

  const onSend = useCallback(async (newMessage = []) => {
    const updatedMessage = {
      ...newMessage[0],
      createdAt: new Date(newMessage[0].createdAt).toISOString(),
    };

    console.log('Sending message with timestamp:', updatedMessage.createdAt);
    // console.log('new messagess', newMessage[0].createdAt);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, updatedMessage),
    );
    if (type === 'listing') {
      await dispatch(
        sendListingMessage(
          user.user_id,
          listing_id,
          updatedMessage.text,
          updatedMessage.createdAt,
        ),
      );
    } else {
      await dispatch(
        sendGroupMessage(
          user.user_id,
          listing_id,
          updatedMessage.text,
          updatedMessage.createdAt,
        ),
      );
    }
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
            borderRadius: 15,
            borderTopRightRadius: 0,
            marginBottom: 10,
            maxWidth: hp(40),
            minWidth: hp(2),
            // width: hp(40),
            padding: 5,
            // right: 15,
            // justifyContent: 'flex-end',
            // marginLeft: 0,
          },
          left: {
            backgroundColor: colors.white,
            borderRadius: 15,
            borderTopLeftRadius: 0,
            maxWidth: hp(40),
            minWidth: hp(2),
            // width: hp(40),
            marginBottom: 20,
            padding: 5,
            top: hp(1),
            left: hp(0),
          },
        }}
      />
    );
  };

  const renderChatMembers = async () => {
    setChatLoader(true);
    if (type == 'group') {
      await dispatch(fetchGroupMembers(listing_id));
    } else {
      await dispatch(renderListingMembers(listing_id));
    }
    setChatLoader(false);
  };

  const renderChatHistory = async () => {
    // setChatLoader(true);
    try {
      if (type === 'listing') {
        await dispatch(ListingMessages(listing_id, setMessages));
      } else {
        await dispatch(groupMessages(listing_id, setMessages));
      }
    } catch (error) {
      console.log('error fetching messages ======>', error);
    } finally {
      // setChatLoader(false);
    }
  };

  const renderLoader = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  };

  return (
    <Container>
      {chatLoader ? (
        renderLoader()
      ) : (
        <>
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
                renderItem={({item, ind}) => (
                  <ChatMembers
                    key={item.ID}
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
            // messages={messages.filter(message => message.user._id !== user.user_id)}
            messages={messages}
            // key={user.user_id}
            isLoadingEarlier={true}
            onSend={messages => onSend(messages)}
            user={{
              _id: user.user_id.toString(),
              name: user.username,
              avatar: user.feature_image_url
                ? user.feature_image_url
                : user.featured_image_url,
            }}
            showAvatarForEveryMessage
            renderUsernameOnMessage={true}
            renderSend={renderSend}
            renderBubble={renderBubble}
            alwaysShowSend
            textInputProps={{
              color: 'white',
              placeholderTextColor: 'white',
            }}
            renderInputToolbar={renderInputToolbar}
          />
        </>
      )}
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
