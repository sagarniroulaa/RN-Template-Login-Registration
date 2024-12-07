import React from "react";

//REACT HOOK FORM
// ---- npm install react-hook-form
import { useForm, Controller } from "react-hook-form";
import { TextInput, View, StyleSheet, Button, Text } from "react-native";

// ENCRYPTION IMPORT
// ---- npm install react-native-bcrypt
import bcrypt from "react-native-bcrypt";

// YUP VALIDATION IMPORTS
// Requirements:
// ---- npm install @hookform/resolvers
// ---- npm install yup
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// YUP Validation Schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username."),
  password: Yup.string().required("Password must be entered."),
});

function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Include yupResolver as your validator for form
  });

  const handleLogin = async (data) => {
    const { username, password } = data;

    // Hash the password with bcrypt
    try {
      const salt = bcrypt.genSaltSync(10); // Generate salt
      const hashedPw = bcrypt.hashSync(password, salt); // Hash password

      console.log("Username:", username);
      console.log("Hashed Password:", hashedPw);

      // You can now send the hashed password to your server
      // Example: sendToServer(username, hashedPw);
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  };

  return (
    <View style={styles.inputsContainer}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputBox}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
          ></TextInput>
        )}
        name="username"
      />

      {errors.username && (
        <Text style={styles.errorMsg}>{errors.username.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />

      {errors.password && (
        <Text style={styles.errorMsg}>{errors.password.message}</Text>
      )}

      <Button title="Submit" onPress={handleSubmit(handleLogin)} />
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 15,
    padding: 0,
  },

  errorMsg: {
    marginBottom: 30,
    color: "red",
  },

  inputsContainer: {
    width: "95%",
  },

  inputBox: {
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
});

export default LoginScreen;
