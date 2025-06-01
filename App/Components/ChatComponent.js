import {useContext, useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {UserContext} from '../Context/UseContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Utils/Colors';
import {useNavigation} from '@react-navigation/native';

export const ChatComponent = ({item}) => {
  const lastMessage = item.messages?.[item.messages.length - 1];
  const navigation = useNavigation();

  const handleMessages = () => {
    navigation.navigate('Message', {
      groupId: item.groupId,
      groupName: item.groupName,
      messages: item.messages,
    });
  };

  return (
    <Pressable style={styles.chat} onPress={handleMessages}>
      <View style={styles.circle}>
        <Ionicons name={'person'} size={24} color={Colors.mediumGray} />
      </View>

      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.userName}>{item.groupName}</Text>
          <Text style={styles.message}>
            {lastMessage?.text || 'Tap to Start Messaging'}
          </Text>
        </View>

        <View>
          <Text style={styles.time}>{lastMessage?.time || 'Now'}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chat: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    backgroundColor: Colors.white,
    height: 80,
    marginTop: 10,
    marginHorizontal: 10,
  },
  userName: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    opacity: 0.8,
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  time: {
    opacity: 0.6,
  },
  circle: {
    width: 50,
    borderRadius: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginRight: 10,
  },
});
