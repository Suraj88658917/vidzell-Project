import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from "react-native";
import { wp, hp } from "../../../../utils/responsive";
import { COLORS } from "../../../../utils/colors";
import { SvgProps } from "react-native-svg";
import { FONTS } from "../../../../utils/fonts";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");

//  Type
export type SlideType = {
    id: string;
    image: React.FC<SvgProps>;
    title: string;
    description: string;
};

//  Props
type Props = {
    data: SlideType[];
    onDone: () => void;
    onSlideChange?: (index: number) => void;
};

const WalkthroughList: React.FC<Props> = ({ data, onDone }) => {
    const [index, setIndex] = useState(0);

    //  Track current slide
    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const i = Math.round(e.nativeEvent.contentOffset.x / width);
        setIndex(i);
    };

    //  Render Item
    const renderItem = ({ item }: { item: SlideType }) => {
        const ImageComponent = item.image;

        return (
            <View style={styles.slide}>
                <ImageComponent
                    width={wp("80%")}
                    height={hp("40%")}
                    style={{ marginTop: hp("6%")}}
                />
                <View style={{ marginTop: wp("12%") }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc}>{item.description}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/*  FlatList */}
            <FlatList<SlideType>
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                contentContainerStyle={{ alignItems: "center" }}
            />

            {/* DOTS */}
            <View style={styles.dotsContainer}>
                {data.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            index === i && styles.activeDot,
                        ]}
                    />
                ))}
            </View>

            {/*  BUTTON */}
            {index === data.length - 1 && (
                <View style={{ position: "absolute", top: wp("137%"), left: wp("5%") }}>
                    <TouchableOpacity onPress={onDone} activeOpacity={0.8}>
                        <LinearGradient
                            colors={["#EC4A8A", "#7933AF"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.button}
                        >
                            <Text style={styles.btnText}>Get Started</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default WalkthroughList;

//  Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    slide: {
        width,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: wp("5%"),
        marginBottom: wp("40%")

    },

    title: {
        fontSize: wp("5.7%"),
        color: COLORS.white,
        marginBottom: hp("2%"),
        fontFamily: FONTS.bold,
        textAlign: "center",
    },

    desc: {
        fontSize: wp("3.5%"),
        color: COLORS.gray,
        textAlign: "center",
        lineHeight: wp("4.7%"),
        fontFamily: FONTS.regular
    },

    // DOTS 
    dotsContainer: {
        position: "absolute",
        bottom: hp("14%"),
        flexDirection: "row",
        alignSelf: "center",
    },

    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: COLORS.white,
        marginHorizontal: 4,
        opacity: 0.3,
    },

    activeDot: {
        width: 30,
        opacity: 1,
        backgroundColor: "#7933AF",
    },

    button: {
        marginTop: hp("3%"),
        alignSelf: "center",
        paddingVertical: hp("2%"),
        paddingHorizontal: wp("35%"),
        borderRadius: 10,
    },

    btnText: {
        color: "#fff",
        fontSize: wp("4%"),
        textAlign: "center",
        fontFamily: FONTS.semiBold,
    },
});