import { View, TextInput, StyleSheet } from "react-native";

const TextArea = ({
  label,
  value,
  onChange,
  editable = true,
}) => {
  return (
    <View style={styles.inputBox}>
      <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChange}
        editable={editable}
        multiline
        textAlignVertical="top"
        style={styles.input}
        placeholderTextColor="#9aa3b2"
      />
    </View>
  );
};

export default TextArea;

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55, // نفس Input
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
