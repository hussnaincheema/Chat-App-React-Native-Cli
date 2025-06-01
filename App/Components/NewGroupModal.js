import React, {useContext} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
} from 'react-native';
import {UserContext} from '../Context/UseContext';
import Colors from '../Utils/Colors';
import {CustomInput} from './CustomInput';

const NewGroupModal = ({
  confirmButton,
  cancelButton,
  Input = false,
  text = false,
  onConfirm,
  onClose,
  loading = false,
  visible,
}) => {
  const {modalVisible, setModalVisible, groupName, setGroupName} =
    useContext(UserContext);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          {Input && (
            <View style={styles.input}>
              <CustomInput
                label="Group Name"
                placeholder="Enter Group Name"
                value={groupName}
                onChangeText={value => setGroupName(value)}
                autoCapitalize="none"
              />{' '}
            </View>
          )}
          {text && <Text style={styles.modalText}>{text}</Text>}
          <View style={styles.modalButtons}>
            <Pressable
              style={styles.button}
              onPress={onConfirm}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.textStyle}>{confirmButton}</Text>
              )}
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}>
              <Text style={styles.textStyle}>{cancelButton}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewGroupModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 30,
    width: '80%',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    marginTop: 15,
    backgroundColor: Colors.DodgerBlue,
  },
  buttonClose: {
    backgroundColor: Colors.mediumGray,
  },
  textStyle: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
  },
  input: {width: '100%'},
});
