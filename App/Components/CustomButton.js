import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '../Utils/Colors';

export const CustomButton = ({
  loaderColor = Colors.white,
  text,
  loading = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 324,
    height: 58,
    marginVertical: 8,
    backgroundColor: Colors.cornFlowerBlue,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
