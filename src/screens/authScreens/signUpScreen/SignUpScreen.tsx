import React from "react";
import { View, Text, Button , StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../navigation/types";

type NavProp = NativeStackNavigationProp<StackParamList, "SignUp">;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.container}>
      <Text>SignUp Screen</Text>

      <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />

      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});