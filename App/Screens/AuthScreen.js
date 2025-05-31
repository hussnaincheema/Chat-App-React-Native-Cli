import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {CustomInput} from '../Components/CustomInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Utils/Colors';
import {CustomButton} from '../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {screensEnabled} from 'react-native-screens';
import {UserContext} from '../Context/UseContext';
import Toast from 'react-native-toast-message';

const AuthScreen = () => {
  const [showLoginView, setShowLoginView] = useState(false);
  const [email, setEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureLoginPassword, setSecureLoginPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUserName, setCurrentUserName] = useState('');

  const {register, login, currentUser} = useContext(UserContext);

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await AsyncStorage.getItem('users');
      console.log('Users Data', usersData);
      if (usersData) {
        setUsers(JSON.parse(usersData));
      }
    };
    loadUsers();
  }, []);

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!currentUserName || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all fields.',
        position: 'top',
      });
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      try {
        await register(currentUserName, email, password);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'You have Created an Account Successfully',
          position: 'top',
        });
        setIsRegistered(true);
        setCurrentUserName('');
        setEmail('');
        setPassword('');
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Registration failed. Please try again.',
          position: 'top',
        });
      }
      setLoading(false);
    }, 400);
  };

  // Replace handleLogin:
  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all fields.',
        position: 'top',
      });
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      const success = await login(email, password);
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Login successful!',
          position: 'top',
        });
        navigation.navigate('Chat');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Invalid Credentials',
          position: 'top',
        });
      }
      setLoading(false);
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {!isRegistered ? (
          <View style={styles.mainContainer}>
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
                <Text style={styles.switchText}>
                  Already have an account?{' '}
                  <Text
                    style={styles.linkText}
                    onPress={() => {
                      setIsRegistered(true);
                    }}>
                    Login
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.mainContainer}>
            <Text style={styles.heading}>Login</Text>
            <View style={styles.formContainer}>
              <CustomInput
                label="Email"
                placeholder="Enter your Email"
                value={email}
                onChangeText={value => setEmail(value)}
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
                <Text style={styles.switchText}>
                  Don’t have an account?{' '}
                  <Text
                    style={styles.linkText}
                    onPress={() => {
                      setIsRegistered(false);
                    }}>
                    Register
                  </Text>
                </Text>
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
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.primaryBlue,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  formContainer: {
    marginTop: 30,
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.mediumGray,
  },

  linkText: {
    color: Colors.primaryBlue,
    fontWeight: 'bold',
  },
  mainContainer: {
    marginTop: 50,
  },
});
