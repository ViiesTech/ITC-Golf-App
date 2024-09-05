import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assets/colors';
import Button from './Button';

const ConfirmationModal = ({
  visible,
  onRequestClose,
  onPressOut,
  onCancel,
  onConfirm,
  modalText,
  instruction,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <TouchableOpacity
        style={styles.modalWrapper}
        onPress={onPressOut}
        activeOpacity={2}>
        <View style={styles.modalView}>
          {instruction ? (
            <>
              <Text style={styles.modalTitle}>Adding a New Listing</Text>
              <Text style={styles.instructionText}>
                <Text style={{fontWeight: 'bold', fontSize: hp(2)}}>
                  1. Quick description of your golf listing:
                </Text>
                {'\n'}Example: Looking for golf leagues, new to area looking for
                golf buddies or clubs for sale, service offered, golf cart for
                sale. As long as it's golf-related, you can make a listing about
                it.
              </Text>
              <Text style={styles.instructionText}>
                <Text style={{fontWeight: 'bold', fontSize: hp(2)}}>
                  2. Lower drop-down menus are optional:
                </Text>
                {'\n'}You do not have to make a selection in each drop-down
                menu. All menus are optional. You can make one or multiple
                listings with no limit.
              </Text>
              <Text style={styles.instructionText}>
                <Text style={{fontWeight: 'bold', fontSize: hp(2)}}>
                  3. Descriptions:
                </Text>
                {'\n'}Can be as short or as long as you would like.
              </Text>
              <Text style={styles.instructionText}>
                <Text style={{fontWeight: 'bold', fontSize: hp(2)}}>
                  4. Hyperlink:
                </Text>
                {'\n'}Drop-down menu allows you to add a URL/website address
                that leads people to a webpage showcasing your business or item.
                This is not mandatory.
              </Text>
              <Text style={styles.instructionText}>
                <Text style={{fontWeight: 'bold', fontSize: hp(2)}}>
                  5. Listings are not tournaments or groups:
                </Text>
                {'\n'}There is a separate page for tournaments and groups. Go to
                the "Add New Group" tab for multiple player events.
              </Text>
              <Text style={styles.instructionText}>
                As always, hit them well and often. Once you make your first
                listing, you are officially IN THE CUP GOLF.
              </Text>
            </>
          ) : (
            <Text style={styles.text}>{modalText}</Text>
          )}
          <View
            style={[
              styles.buttonWrapper,
              {paddingTop: instruction ? hp('1%') : hp('7%')},
            ]}>
            {!instruction && (
              <Button
                buttonText={'Cancel'}
                buttonStyle={styles.cancelButton}
                onPress={onCancel}
                textStyle={{color: colors.secondary}}
              />
            )}
            <Button
              buttonText={instruction ? 'Close' : 'Confirm'}
              onPress={onConfirm}
              buttonStyle={[
                styles.confirmButton,
                {width: instruction ? '87%' : '45%'},
              ]}
              textStyle={{color: colors.secondary}}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 20,
    elevation: 6,
    borderRadius: 10,
    width: '80%',
    padding: hp('1%'),
  },
  text: {
    color: colors.white,
    fontSize: hp('2%'),
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    gap: 10,
  },
  cancelButton: {
    backgroundColor: colors.white,
    width: '45%',
  },
  confirmButton: {},
  modalTitle: {
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: hp(2),
    fontSize: hp(2.3),
  },
  instructionText: {
    color: colors.white,
    marginBottom: hp(2),
    fontSize: hp(1.7),
    width: hp(37),
  },
});
