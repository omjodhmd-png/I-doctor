import { View, TextInput, StyleSheet } from "react-native";

const Input = ({
  label,
  value,
  onChange,
  keyboard = "default",
  editable = true,
}) => {
  return (
    <View style={styles.inputBox}>
      <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboard}
        editable={editable}
        style={styles.input}
        placeholderTextColor="#9aa3b2"
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    justifyContent: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e6eaf0",
  },
  input: {
    fontSize: 15,
    color: "#000",
  },
});
