import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [allChatRooms, setAllChatRooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
      const usersData = await AsyncStorage.getItem('users');
      if (usersData) {
        setUsers(JSON.parse(usersData));
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const register = async (name, email, password) => {
    const usersData = await AsyncStorage.getItem('users');
    const usersArr = usersData ? JSON.parse(usersData) : [];
    const newUser = {name, email, password};
    const updatedUsers = [...usersArr, newUser];
    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    console.log('Users after registration:', updatedUsers);
  };

  const login = async (email, password) => {
    const usersData = await AsyncStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        loading,
        login,
        logout,
        register,
        users,
        allChatRooms,
        setAllChatRooms,
        modalVisible,
        setModalVisible,
        groupName,
        setGroupName,
      }}>
      {children}
    </UserContext.Provider>
  );
};
