import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import BlueTick from "../../../../assets/images/BlueTick.svg";
import { hp, wp } from "../../../../utils/responsive";
import { FONTS } from "../../../../utils/fonts";

type Props = {
    visible: boolean;
};

const SuccessModal: React.FC<Props> = ({ visible }) => {
    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.box}>

                    {/* ICON */}
                    <View>
                        <BlueTick width={wp("40%")} height={hp("20%")} />
                    </View>

                    <View>
                        <Text style={styles.title}>Verification Successful!</Text>
                        <Text style={styles.subtitle}>
                            Your account has been verified successfully
                        </Text>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

export default SuccessModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(2, 0, 21, 0.85)",
    },

    box: {
        width: "100%",
        height: hp("35%"),
        backgroundColor: "rgba(2, 0, 21, 0.85)",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    title: {
        color: "#fff",
        fontSize: 18,
        fontFamily: FONTS.bold,
        textAlign: "center",
        marginTop: 10,
    },

    subtitle: {
        color: "#aaa",
        fontSize: 13,
        textAlign: "center",
        marginTop: 6,
        fontFamily: FONTS.regular,
        lineHeight: wp("10%")
    },
});