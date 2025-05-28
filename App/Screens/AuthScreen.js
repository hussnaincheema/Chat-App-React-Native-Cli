import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomInput} from '../Components/CustomInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Utils/Colors';
import {CustomButton} from '../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {screensEnabled} from 'react-native-screens';

const AuthScreen = () => {
  const [showLoginView, setShowLoginView] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureLoginPassword, setSecureLoginPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await AsyncStorage.getItem('users');
      if (usersData) {
        setUsers(JSON.parse(usersData));
      }
    };
    loadUsers();
  }, []);

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!currentUserName || !email || !password) {
      alert('Please fill all fields');
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      try {
        const newUser = {
          name: currentUserName,
          email,
          password,
        };
        const updatedUsers = [...users, newUser];
        console.log('Users', updatedUsers);
        setUsers(updatedUsers);
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        setIsRegistered(true);
        setPassword('');
        setCurrentUserName('');
        setEmail('');
        alert('Registration successful! Please login.');
      } catch (e) {
        alert('Registration failed!');
      }
      setLoading(false);
    }, 2000);
  };

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const usersData = await AsyncStorage.getItem('users');
        const usersArray = usersData ? JSON.parse(usersData) : [];
        const foundUser = usersArray.find(
          user =>
            (user.email === currentUserName || user.name === currentUserName) &&
            user.password === password,
        );
        if (foundUser) {
          alert('Login successful!');
          navigation.navigate('Chat');
        } else {
          alert('Invalid credentials');
        }
      } catch (e) {
        alert('Login failed!');
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {!isRegistered ? (
          <View>
            <Text style={styles.heading}>Create An Account</Text>
            <View style={styles.formContainer}>
              <CustomInput
                label="Name"
                placeholder="Enter your Name"
                value={currentUserName}
                onChangeText={value => setCurrentUserName(value)}
                autoCapitalize="none"
              />
              <CustomInput
                label="Email"
                placeholder="Enter your Email"
                value={email}
                onChangeText={value => setEmail(value)}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <CustomInput
                label="Password"
                placeholder="Enter your Password"
                value={password}
                onChangeText={value => setPassword(value)}
                autoCapitalize="none"
                keyboardType="default"
                secureTextEntry={securePassword}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setSecurePassword(!securePassword)}
                    activeOpacity={0.8}>
                    <MaterialCommunityIcons
                      name={securePassword ? 'eye-off-outline' : 'eye-outline'}
                      size={24}
                      color={Colors.mediumGray}
                    />
                  </TouchableOpacity>
                }
              />
              <View style={styles.buttonContainer}>
                <CustomButton
                  text="Register"
                  onPress={handleRegister}
                  disabled={loading}
                  loading={loading}
                />
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.heading}>Login</Text>
            <View style={styles.formContainer}>
              <CustomInput
                label="Email"
                placeholder="Enter your Email"
                value={currentUserName}
                onChangeText={value => setCurrentUserName(value)}
                autoCapitalize="none"
              />

              <CustomInput
                label="Password"
                placeholder="Enter your Password"
                value={password}
                onChangeText={value => setPassword(value)}
                autoCapitalize="none"
                keyboardType="default"
                secureTextEntry={secureLoginPassword}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setSecureLoginPassword(!secureLoginPassword)}
                    activeOpacity={0.8}>
                    <MaterialCommunityIcons
                      name={
                        secureLoginPassword ? 'eye-off-outline' : 'eye-outline'
                      }
                      size={24}
                      color={Colors.mediumGray}
                    />
                  </TouchableOpacity>
                }
              />
              <View style={styles.buttonContainer}>
                <CustomButton
                  text="Login"
                  onPress={handleLogin}
                  disabled={loading}
                  loading={loading}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#467fd0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 30,
  },
});
