import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';
import Colors from '../Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {CustomButton} from '../Components/CustomButton';
const HomeVideo = require('../assets/home_video.mp4');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Auth');
    }, 2000);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Video
          source={HomeVideo}
          style={styles.backgroundVideo}
          resizeMode="contain"
          repeat
          muted
        />

        <View style={styles.content}>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Welcome to ChatApp</Text> – where
            conversations come alive. Our secure messaging platform lets you
            communicate effortlessly with friends, family, and colleagues. Start
            your messaging journey today with just one tap.
          </Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              text="Get Started"
              onPress={handleGetStarted}
              disabled={loading}
              loading={loading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  backgroundVideo: {
    width: '100%',
    aspectRatio: 10 / 12,
    // height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 60,
  },
});

export default HomeScreen;
