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
import OtpBtn from "../../../common/OTPBtn"

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
                    style={{ marginTop: hp("6%") }}
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
            <View>
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
            </View>

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
            {index === data.length - 1 &&  (
                    
                    <View style={{padding:10 , marginTop:wp("14")}}>
                        <OtpBtn
                        title="Get Started"
                        onPress={onDone}
                    />
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
        bottom: hp("16%"),
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
});