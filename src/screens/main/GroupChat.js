import {
  FlatList,
  Image,
  ScrollView,
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
import {members} from '../../DummyData';

const GroupChat = ({route}) => {
  const [messages, setMessages] = useState([]);

  const {title} = route?.params;
  // console.log(title);

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

  return (
    <Container>
      <View style={{paddingTop: hp('5%')}}>
        <SecondaryHeader text={title} />
      </View>
      <View>
        <FlatList
          data={members}
          horizontal
          contentContainerStyle={{
            gap: hp('4%'),
            marginRight: hp('6%'),
            padding: hp('2%'),
          }}
          renderItem={({item, index}) => (
            <View>
              <Image
                source={item.images}
                style={{
                  height: hp('7%'),
                  width: hp('7%'),
                  alignSelf: 'center',
                  marginBottom: hp('2%'),
                }}
                borderRadius={100}
              />
              <Text
                style={{
                  color: colors.white,
                  fontSize: hp('2%'),
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                {item.text}
              </Text>
            </View>
          )}
        />
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
});
