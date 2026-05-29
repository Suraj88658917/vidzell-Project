import React, { useRef, useState } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { hp, wp } from "../../utils/responsive";
import { FONTS } from "../../utils/fonts";

type Props = TextInputProps & {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
};

const FloatingInput: React.FC<Props> = ({
    label,
    value,
    onChangeText,
    error,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;
    const inputRef = useRef<TextInput>(null);

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(animatedLabel, {
            toValue: 1,
            duration: 180,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!value) {
            Animated.timing(animatedLabel, {
                toValue: 0,
                duration: 180,
                useNativeDriver: false,
            }).start();
        }
    };

    const labelTop = animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [hp("1.8%"), hp("-1.1%")],
    });

    const labelSize = animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [wp("3.8%"), wp("3%")],
    });

    const labelColor = animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: ["#555", isFocused ? "#ffffffff" : "#888"],
    });

    // const borderColor = error
    //     ? "#e91e8c"
    //     : isFocused
    //         ? "#e91e8c"
    //         : "#2a2540";

    return (
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
            <View style={styles.wrapper}>
                <View style={[styles.container,]}>
                    <Animated.Text
                        style={[
                            styles.label,
                            { top: labelTop, fontSize: labelSize, color: labelColor },
                        ]}
                    >
                        {label}
                    </Animated.Text>

                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        value={value}
                        onChangeText={onChangeText}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        selectionColor="#ffffffff"
                        placeholderTextColor="transparent"
                        {...rest}
                    />
                </View>

                {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default FloatingInput;

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: hp("2%"),
    },
    container: {
        backgroundColor: "#141128",
        borderRadius: wp("3%"),
        borderWidth: wp("0.1%"),
        paddingHorizontal: wp("4%"),
        paddingTop: hp("2.2%"),
        paddingBottom: hp("1.2%"),
        justifyContent: "center",
        borderColor: "#322D43"
    },
    label: {
        position: "absolute",
        left: wp("4%"),
        fontFamily: FONTS.regular,
        backgroundColor: "transparent",
    },
    input: {
        color: "#fff",
        fontSize: wp("3.8%"),
        fontFamily: FONTS.regular,
        padding: 0,
        marginTop: hp("0.8%"),
    },
    error: {
        color: "#e91e8c",
        fontSize: wp("3%"),
        fontFamily: FONTS.regular,
        marginTop: hp("0.4%"),
        marginLeft: wp("1%"),
    },
});