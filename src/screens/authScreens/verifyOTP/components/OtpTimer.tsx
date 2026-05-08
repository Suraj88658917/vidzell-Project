import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { wp, hp } from "../../../../utils/responsive";
import Clock from "../../../../assets/images/clock.svg"
import { FONTS } from "../../../../utils/fonts";

type Props = {
    duration?: number;
    onResend: () => void;
};

const OtpTimer: React.FC<Props> = ({ duration = 30, onResend }) => {
    const [time, setTime] = useState<number>(duration);
    const [active, setActive] = useState<boolean>(true);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (active && time > 0) {
            interval = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        }

        if (time === 0) {
            setActive(false);
        }

        return () => clearInterval(interval);
    }, [time, active]);

    const handleResend = () => {
        onResend();
        setTime(duration);
        setActive(true);
    };

    const formatTime = () => {
        return `00:${time < 10 ? `0${time}` : time}`;
    };

    return (
        <View style={styles.container}>
            {active ? (
                <View style={styles.timerRow}>
                    <Clock width={wp("3.9%")} height={hp("2.5%")} />
                    <Text style={styles.timer}>Retry in {formatTime()}</Text>
                </View>
            ) : (
                <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.resend}>Resend OTP</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default OtpTimer;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: wp("2%"),
    },
    timerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    timer: {
        marginLeft: wp("1%"),
        color: "#605B73",
        fontSize: wp("3.3%"),
    },
    resend: {
        color: "#EC4A8A",
        fontSize: wp("3.4%"),
        fontFamily: FONTS.semiBold
    },
});