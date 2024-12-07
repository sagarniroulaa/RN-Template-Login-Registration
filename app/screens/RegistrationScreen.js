import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Picker } from "@react-native-picker/picker";

import {
  TextInput,
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// IMPORT CHECKBOXES
// ---- npm install @react-native-community/checkbox
// --- npm install @react-native-picker/picker

// YUP VALIDATION IMPORTS
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// YUP Validation Schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  dob: Yup.string().required("Date of birth is required."),
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string().required("Password is required."),
  gender: Yup.string().required("Gender is required."),
  languages: Yup.array().min(1, "At least one language is required."),
  country: Yup.string().required("Country is required."),
});

function RegistrationScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      gender: null,
      country: "",
      languages: [],
    },
  });

  const genders = [
    { id: 1, label: "Male" },
    { id: 2, label: "Female" },
    { id: 3, label: "Other" },
  ];

  const countries = ["Nepal", "India", "Bhutan"];

  const languages = ["English", "Nepali", "Hindi"];

  const handleRegister = (data) => {
    console.log("Registration Data:", data);
    reset();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputBox}
              placeholder="First Name"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.firstName && (
          <Text style={styles.errorMsg}>{errors.firstName.message}</Text>
        )}

        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputBox}
              placeholder="Last Name"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.lastName && (
          <Text style={styles.errorMsg}>{errors.lastName.message}</Text>
        )}

        <Controller
          control={control}
          name="dob"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputBox}
              placeholder="Date of Birth (YYYY-MM-DD)"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.dob && (
          <Text style={styles.errorMsg}>{errors.dob.message}</Text>
        )}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputBox}
              placeholder="Email"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorMsg}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorMsg}>{errors.password.message}</Text>
        )}

        <Text style={styles.title}>Select Gender</Text>

        {/* Gender Radio Buttons */}
        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              {genders.map((gender) => (
                <TouchableOpacity
                  key={gender.id}
                  style={styles.radioButtonContainer}
                  onPress={() => onChange(gender.label)}
                >
                  <View style={styles.radioButton}>
                    {value === gender.label && (
                      <View style={styles.radioButtonSelected} />
                    )}
                  </View>
                  <Text style={styles.radioText}>{gender.label}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        />
        {/* Error Message */}
        {errors.gender && (
          <Text style={styles.errorMsg}>{errors.gender.message}</Text>
        )}

        <Text style={styles.title}>Select Country</Text>

        {/* Country Dropdown */}
        <Controller
          name="country"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select a country" value="" />
                {countries.map((country) => (
                  <Picker.Item key={country} label={country} value={country} />
                ))}
              </Picker>
            </View>
          )}
        />
        {/* Error Message */}
        {errors.country && (
          <Text style={styles.errorMsg}>{errors.country.message}</Text>
        )}

        {/* Languages Checkboxes */}
        <Text style={styles.title}>Select Languages</Text>
        <Controller
          name="languages"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              {languages.map((language) => {
                const isSelected = value.includes(language);
                return (
                  <TouchableOpacity
                    key={language}
                    style={styles.checkboxContainer}
                    onPress={() => {
                      if (isSelected) {
                        onChange(value.filter((lang) => lang !== language));
                      } else {
                        onChange([...value, language]);
                      }
                    }}
                  >
                    <View
                      style={[styles.checkbox, isSelected && styles.checked]}
                    >
                      {isSelected && <View style={styles.checkmark} />}
                    </View>
                    <Text style={styles.checkboxLabel}>{language}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        />
        {errors.languages && (
          <Text style={styles.errorMsg}>{errors.languages.message}</Text>
        )}
      </ScrollView>
      <View style={{ marginBottom: -20 }}>
        <Button title="Submit" onPress={handleSubmit(handleRegister)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "95%",
    height: "80%",
  },
  inputBox: {
    borderColor: "grey",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "column",
    marginBottom: 10,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorMsg: {
    color: "red",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },
  radioText: {
    marginLeft: 10,
    fontSize: 14,
  },

  // Styles for dropdown (country)
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },

  // For checkbox
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    borderColor: "#4CAF50",
    backgroundColor: "#4CAF50",
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

export default RegistrationScreen;
