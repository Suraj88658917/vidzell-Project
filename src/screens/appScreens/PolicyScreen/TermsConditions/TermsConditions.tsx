import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RenderHTML, { MixedStyleDeclaration } from "react-native-render-html";
import { useState } from "react";

import Header from "../../../common/Header";
import { StackParamList } from "../../../../navigation/types";
import LinearGradient from "react-native-linear-gradient";
import { wp, hp } from "../../../../utils/responsive";
import { FONTS } from "../../../../utils/fonts";
import CheckboxText from "../../../common/TickAccept"
import Button from "../../../common/Button";

type NavProps = NativeStackNavigationProp<StackParamList>;

const SECTIONS = [
  {
    title: "Introduction",
    description:
      "Welcome to VidZell, a B2B wholesale marketplace platform. By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding with registration or using our platform.",
  },
  {
    title: "User Responsibilities",
    description:
      "As a registered business user, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration, including valid business license documentation. You must update this information promptly if any changes occur.",
  },
  {
    title: "Payment Terms",
    description:
      "All prices listed on our platform are subject to change without prior notice. Payment must be made in full before order processing unless credit terms have been separately agreed upon in writing. Accepted payment methods include bank transfer, credit card, and other approved payment gateways. Payment processing fees, if any, will be clearly indicated at checkout. Invoices will be provided electronically for all transactions. Late payments may incur additional charges as per our credit policy.",
  },
  {
    title: "Order Policy",
    description:
      "Orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order at our discretion, including but not limited to cases of pricing errors, product unavailability, or suspected fraudulent activity.",
  },
];

const TERMS_HTML = SECTIONS.map(
  ({ title, description }) => `
  <h2>${title}</h2>
  <p>${description.replace(/\n/g, "<br/>")}</p>
`
).join("");

const TermsConditions: React.FC = () => {
  const navigation = useNavigation<NavProps>();
  const { width } = useWindowDimensions();
  const [checked, setChecked] = useState(false);

  const tagsStyles: Record<string, MixedStyleDeclaration> = {
    h2: {
      fontSize: wp("4.2%"),
      color: "#ffffff",
      marginTop: hp("2.5%"),
      marginBottom: hp("1%"),
      fontFamily: FONTS.semiBold,
    },
    p: {
      fontSize: wp("3.6%"),
      color: "#AEA7C3",
      lineHeight: wp("6.5%"),
      marginBottom: hp("1%"),
      fontFamily: FONTS.regular,
    },
    ul: {
      marginBottom: hp("1%"),
      paddingLeft: wp("4%"),
    },
    li: {
      fontSize: wp("3.6%"),
      color: "#AEA7C3",
      lineHeight: wp("6.5%"),
      marginBottom: hp("0.8%"),
      fontFamily: FONTS.regular,
    },
    b: {
      color: "#A78BFA",
      fontFamily: FONTS.semiBold,
    },
    a: {
      color: "#A78BFA",
      textDecorationLine: "underline",
    },
  };

  const baseStyle: MixedStyleDeclaration = {
    fontSize: wp("3.6%"),
    color: "#AEA7C3",
    fontFamily: FONTS.regular,
  };

  return (
    <LinearGradient
      colors={["#040007", "#040007"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>
          <Header
            title="Terms & Conditions"
            onBack={() => navigation.goBack()}
          />
        </View>

        {/* STEP 2 — DIVIDER */}
        <View style={styles.line} />

        <View style={{ padding: 10 }}>
          <View style={styles.textBox}>
            <RenderHTML
              contentWidth={width}
              source={{ html: `<p>Last Updated: 16 Nov 2025</p>` }}
              tagsStyles={{
                p: {
                  fontSize: wp("3.4%"),
                  color: "#fff",
                  margin: 0,
                  padding: 0,
                  fontFamily: FONTS.semiBold,
                },
              }}
            />
          </View>

          <RenderHTML
            contentWidth={width - wp("8%")}
            source={{ html: TERMS_HTML }}
            tagsStyles={tagsStyles}
            baseStyle={baseStyle}
            enableExperimentalMarginCollapsing
          />
        </View>

        <CheckboxText
          checked={checked}
          onToggle={() => setChecked(!checked)}
          label="I Read & Accept the Terms & Conditions"
        />
        <View style={{padding:10}}>
         <Button 
            title="I Agree & Accept"
            onPress={() => console.log("this is navigate")}
          />
          </View>

      </ScrollView>
    </LinearGradient>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    marginTop: wp("12%"),
  },

  line: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.16)",
    marginVertical: 5,
  },

  textBox: {
    alignSelf: "flex-start",
    paddingHorizontal: wp("4%"),
    height: hp("6%"),
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
});