import {
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Colors from '../Utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../Context/UseContext';
import {MessageComponent} from '../Components/MessageComponent';
import {CustomInput} from '../Components/CustomInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {socket} from '../Utils';

const MessageScreen = ({navigation, route}) => {
  const {groupId, groupName, messages} = route.params;
  const {
    allChatMessages,
    setAllChatMessages,
    currentUser,
    currentChatMessage,
    setCurrentChatMessage,
  } = useContext(UserContext);

  const handleAddNewMessage = () => {
    console.log('Adding new message:', currentChatMessage);
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    };

    if (currentUser) {
      socket.emit('newChatMessage', {
        currentChatMessage,
        groupIdentifier: groupId,
        currentUser,
        timeData,
      });

      setCurrentChatMessage('');
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    socket.emit('joinGroup', groupId);
    socket.emit('findGroup', groupId);

    const handleFoundGroup = allChats => setAllChatMessages(allChats);
    socket.on('foundGroup', handleFoundGroup);

    return () => {
      socket.off('foundGroup', handleFoundGroup);
    };
  }, [groupId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.side}>
          <Ionicons
            name={'arrow-back'}
            size={24}
            color={Colors.primaryBlue}
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={styles.center}>
          <Text style={styles.chatName}>{groupName}</Text>
        </View>

        <View style={styles.side} />
      </View>

      <View style={styles.messagesContainer}>
        {allChatMessages.length > 0 ? (
          <FlatList
            data={allChatMessages}
            renderItem={({item}) => (
              <MessageComponent item={item} currentUser={currentUser} />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.noChatContainer}>
            <Text style={styles.noChatText}>
              No Message Yet, Start Chatting!
            </Text>
          </View>
        )}
      </View>

      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          value={currentChatMessage}
          onChangeText={value => setCurrentChatMessage(value)}
          placeholder="Enter your message"
          keyboardType="default"
        />

        <Pressable onPress={handleAddNewMessage}>
          <MaterialCommunityIcons
            name={'send'}
            size={34}
            color={Colors.primaryBlue}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  side: {
    width: 30,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  chatName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.primaryBlue,
  },
  messagesContainer: {
    flex: 1,
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
  messageInputContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageInput: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 50,
    marginRight: 10,
    borderColor: Colors.cornFlowerBlue,
  },
});
