import {StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from '../Utils/Colors';

export const CustomInput = ({
  label,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
  placeholder,
  onBlur,
  rightIcon,
  customInputStyle = {},
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.fieldContainer}>
        <TextInput
          style={[styles.input, customInputStyle]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          placeholderTextColor={Colors.mediumGray}
          onBlur={onBlur}
        />

        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 8,
    marginLeft: 11,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.cornFlowerBlue,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    color: Colors.black,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 5,
    flex: 1,
  },
  icon: {
    padding: 8,
  },
});
