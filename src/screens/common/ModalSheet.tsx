import React, { useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { wp, hp } from "../../utils/responsive";
import { FONTS } from "../../utils/fonts";
import Button from "../common/Button";
import CloseIcon from "../../assets/images/CloseModal.svg";

type Props = {
    visible: boolean;
    animationType?: "fade" | "slide" | "none";
    onRequestClose?: () => void;
    icon?: React.ReactNode;
    title?: string;
    subtitle?: string;
    autoClose?: boolean;
    autoCloseDelay?: number;
    onAutoClose?: () => void;
    buttonTitle?: string;
    onButtonPress?: () => void;
    showCloseButton?: boolean;
    children?: React.ReactNode;
};

const ModalSheet: React.FC<Props> = ({
    visible,
    animationType = "fade",
    onRequestClose,
    icon,
    title,
    subtitle,
    autoClose = false,
    autoCloseDelay = 1000,
    onAutoClose,
    buttonTitle,
    onButtonPress,
    showCloseButton = true,
    children,
}) => {

    useEffect(() => {
        if (visible && autoClose) {
            const timer = setTimeout(() => {
                onAutoClose?.();
            }, autoCloseDelay);
            return () => clearTimeout(timer);
        }
    }, [visible, autoClose]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType={animationType}
            onRequestClose={onRequestClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {showCloseButton && onRequestClose && (
                        <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={onRequestClose}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            activeOpacity={0.7}
                        >
                            <CloseIcon width={wp("4%")} height={wp("4%")} />
                        </TouchableOpacity>
                    )}

                    {icon && (
                        <View style={styles.iconWrapper}>{icon}</View>
                    )}

                    {title && (
                        <Text style={styles.title}>{title}</Text>
                    )}

                    {subtitle && (
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    )}

                    {buttonTitle && onButtonPress && (
                        <View>
                            <Button
                                title={buttonTitle}
                                onPress={onButtonPress}
                                style={styles.btn}
                            />
                        </View>
                    )}

                    {children}

                </View>
            </View>
        </Modal>
    );
};

export default ModalSheet;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "flex-end",
    },
    container: {
        width: wp("100%"),
        height:hp("35%"),
        backgroundColor: "#000",
        borderTopLeftRadius: wp("4%"),
        borderTopRightRadius: wp("4%"),
        paddingVertical: hp("3.5%"),
        paddingHorizontal: wp("6%"),
        alignItems: "center",
        gap: hp("1.5%"),
        borderWidth: 0.5,
        borderColor: "rgba(255,255,255,0.1)",
    },
    closeBtn: {
        position: "absolute",
        top: hp("2%"),
        right: wp("5%"),
        zIndex: 10,
    },
    iconWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: "#fff",
        fontSize: wp("4.2%"),
        fontFamily: FONTS.semiBold,
        textAlign: "center",
    },
    subtitle: {
        color: "#c8c5c5",
        fontSize: wp("3.2%"),
        fontFamily: FONTS.regular,
        textAlign: "center",
        lineHeight: wp("5%"),
    },
    btn: {
        width: wp("80%"),
    },
});