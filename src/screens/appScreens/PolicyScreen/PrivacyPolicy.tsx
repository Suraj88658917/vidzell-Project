import React from "react";
import { StyleSheet, View , StatusBar  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Header from "../../common/Header";
import { COLORS } from "../../../utils/colors";
import { StackParamList } from "../../../navigation/types"
import LinearGradient from "react-native-linear-gradient";

type NavProps = NativeStackNavigationProp<StackParamList>;

const PrivacyPolicy: React.FC = () => {
  const navigation = useNavigation<NavProps>();

  return (
     <LinearGradient
          colors={[
            COLORS.black,
            COLORS.black,
            COLORS.black,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.container}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent" 
            translucent
          />

      <Header
        title="Privacy Policy"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {/* Add your privacy text here */}
      </View>
    </LinearGradient>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 16,
  },
});