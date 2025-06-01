import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../Context/UseContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Utils/Colors';
import {ChatComponent} from '../Components/ChatComponent';
import {CustomButton} from '../Components/CustomButton';
import NewGroupModal from '../Components/NewGroupModal';
import Toast from 'react-native-toast-message';
import {socket} from '../Utils';
import {useNavigation} from '@react-navigation/native';

const ChatScreen = () => {
  const {
    currentUser,
    allChatRooms,
    setAllChatRooms,
    modalVisible,
    setModalVisible,
    groupName,
    setGroupName,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    socket.emit('getAllGroups');
    socket.on('groupList', groups => {
      console.log('Received groups:', groups);
      setAllChatRooms(groups);
    });
  }, [socket]);

  const handleNewGroup = () => {
    setModalVisible(true);
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Group name cannot be empty.',
        position: 'top',
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      console.log('Creating group with name:', groupName);
      socket.emit('createGroup', groupName);
      setModalVisible(false);
      setGroupName('');
      setLoading(false);
    }, 400);
  };

  const handleConfirmLogout = () => {
    setLoading(true);
    setTimeout(() => {
      socket.disconnect();
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Logged out successfully',
        position: 'top',
      });
      setLogoutModalVisible(false);
      navigation.navigate('Home');
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome {currentUser?.name}!</Text>
        <TouchableOpacity onPress={() => setLogoutModalVisible(true)}>
          <MaterialCommunityIcons
            name={'logout'}
            size={24}
            color={Colors.primaryBlue}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {allChatRooms && allChatRooms.length > 0 ? (
          <FlatList
            data={allChatRooms}
            renderItem={({item}) => (
              <ChatComponent item={item} keyExtractor={item => item.id} />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.noChatContainer}>
            <Text style={styles.noChatText}>No Group available</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <CustomButton
            text="Create New Chat"
            onPress={handleNewGroup}
            disabled={loading}
            loading={loading}
          />
        </View>
      </View>

      {/* Create New Group Modal */}
      <NewGroupModal
        Input={true}
        confirmButton={'Create'}
        cancelButton={'Cancel'}
        onConfirm={handleCreateGroup}
        onClose={() => setModalVisible(false)}
        loading={loading}
        visible={modalVisible}
      />

      {/* Logout Modal */}
      <NewGroupModal
        Input={false}
        text={'Are you sure you want to logout?'}
        confirmButton={'Confirm'}
        cancelButton={'Cancel'}
        onConfirm={handleConfirmLogout}
        onClose={() => setLogoutModalVisible(false)}
        loading={loading}
        visible={logoutModalVisible}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryBlue,
  },
  noChatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChatText: {
    fontSize: 16,
    color: Colors.mediumGray,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
