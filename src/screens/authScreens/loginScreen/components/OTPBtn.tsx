import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FONTS } from "../../../../utils/fonts";
import { wp, hp } from "../../../../utils/responsive";

type Props = {
    disabled: boolean;
    onPress: () => void;
};

const SendOtpButton: React.FC<Props> = ({ disabled, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                disabled={disabled}
                onPress={onPress}
            >
                <LinearGradient
                    colors={
                        disabled
                            ? ["#4E1C3F", "#4E1C3F"]
                            : ["#EC4A8A", "#7933AF"]
                    }
                    style={styles.button}
                >
                    <Text
                        style={[
                            styles.text,
                            {
                                color: disabled ? "rgba(255,255,255,0.5)" : "#FFFFFF",
                            },
                        ]}
                    >
                        Send OTP
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

export default SendOtpButton;

const styles = StyleSheet.create({
    container: {
        marginTop: wp("4%"),
    },
    button: {
        width: "100%",
        height: hp("6.6%"),
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    text: {
        color: "#fff",
        fontSize: wp("4"),
        fontFamily: FONTS.medium
    },
});