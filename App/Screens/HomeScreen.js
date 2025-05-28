import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import Colors from '../Utils/Colors';
const HomeVideo = require('../assets/home_video.mp4');

const HomeScreen = () => {
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
    // flex: 1,
    width: '100%',
    aspectRatio: 10 / 12,
    // height: '100%',
  },
});

export default HomeScreen;
