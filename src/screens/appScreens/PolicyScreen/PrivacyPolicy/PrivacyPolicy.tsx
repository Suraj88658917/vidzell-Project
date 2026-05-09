import React , {useState} from "react";
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

import Header from "../../../common/Header";
import { StackParamList } from "../../../../navigation/types";
import LinearGradient from "react-native-linear-gradient";
import { wp, hp } from "../../../../utils/responsive";
import { FONTS } from "../../../../utils/fonts";
import CheckboxText from "../../../common/TickAccept"
import Button  from "../../../common/Button";


type NavProps = NativeStackNavigationProp<StackParamList>;

const SECTIONS = [
  {
    title: "Information We Collect",
    description:
      "We collect information that you provide directly to us, including when you register for an account, make a purchase, participate in interactive features, or communicate with us. This includes your name, email address, phone number, business information, and payment details.",
  },
  {
    title: "How We Use Your Information",
    description:
      "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, respond to your comments and questions, and protect against fraudulent or illegal activity.",
  },
  {
    title: "Information Sharing",
    description:
      "We do not share your personal information with third parties except as described in this policy. We may share information with vendors, consultants, and service providers who need access to such information to carry out work on our behalf.",
  },
  {
    title: "Data Security",
    description:
      "We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable and we cannot guarantee the security of our systems.",
  },
];

const PRIVACY_HTML = SECTIONS.map(
  ({ title, description }) => `
  <h2>${title}</h2>
  <p>${description.replace(/\n/g, "<br/>")}</p>
`
).join("");

const PrivacyPolicy: React.FC = () => {
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
      fontWeight: "700",
      fontFamily: FONTS.bold,
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
          title="Privacy Policy"
          onBack={() => navigation.goBack()}
        />
      </View>

      <View style={styles.line} />

       <View style={{padding:wp("4%")}}>
         <View style={styles.textBox}>
          <RenderHTML
            contentWidth={width}
            source={{ html: `<p>Last Updated: 16 Nov 2025</p>` }}
            tagsStyles={{
              p: {
                fontSize: wp("3.4%"),
                color: "#fff",
                fontFamily: FONTS.medium,
              },
            }}
          />
        </View>

        <RenderHTML
          contentWidth={width - wp("8%")}
          source={{ html: PRIVACY_HTML }}
          tagsStyles={tagsStyles}
          baseStyle={baseStyle}
          enableExperimentalMarginCollapsing
        />
       </View>

         <CheckboxText
          checked={checked}
          onToggle={() => setChecked(!checked)}
          label="I Read & Accept the Privacy Policy"
        />

         <View style={{ padding: wp("6%"), marginBottom: wp("10%") }}>
          <Button
            title="I Agree & Accept"
            onPress={() => navigation.goBack()}
          />
         </View>

      </ScrollView>
    </LinearGradient>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    marginTop: wp("12%"),
  },

  line: {
     height: hp("0.15%"),
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.16)",
    marginVertical: hp("0.6%"),
  },

  textBox: {
    alignSelf: "flex-start",
    paddingHorizontal: wp("4%"),
    height: hp("7%"),
    backgroundColor: "rgba(255,255,255,0.12)",
     borderRadius: wp("2%"),  
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
});