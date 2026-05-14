import React, { useCallback, useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RangeSlider from 'react-native-sticky-range-slider';
import { FONTS } from '../../../../utils/fonts';
import { hp, wp } from '../../../../utils/responsive';


interface PriceRangeProps {
    min?: number;
    max?: number;
    step?: number;
    minValue: number;
    maxValue: number;
    onMinChange: (value: number) => void;
    onMaxChange: (value: number) => void;
}


const PINK = '#d946a8';
const PURPLE = '#8b5cf6';
const GRAD = [PINK, PURPLE];


const formatPrice = (v: number, max: number): string =>
    v >= max ? `₹${v.toLocaleString()}+` : `₹${v.toLocaleString()}`;

const Thumb = (_type: 'low' | 'high') => (
    <LinearGradient
        colors={GRAD}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.thumb}
    />
);

const Rail = () => <View style={s.rail} />;

const RailSelected = () => (
    <LinearGradient
        colors={GRAD}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={s.railSelected}
    />
);

const PriceRange: React.FC<PriceRangeProps> = ({
    min = 100,
    max = 30000,
    step = 100,
    minValue,
    maxValue,
    onMinChange,
    onMaxChange,
}) => {
    const [localMin, setLocalMin] = useState<number>(minValue);
    const [localMax, setLocalMax] = useState<number>(maxValue);
    const minAnim = useRef(new Animated.Value(0)).current;
    const maxAnim = useRef(new Animated.Value(0)).current;
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showBubble = (anim: Animated.Value) =>
        Animated.timing(anim, { toValue: 1, duration: 150, useNativeDriver: true }).start();

    const hideBubble = (anim: Animated.Value) =>
        Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true }).start();

    const handleValueChange = useCallback(
        (low: number, high: number) => {
            onMinChange(low);
            onMaxChange(high);

            showBubble(minAnim);
            showBubble(maxAnim);

            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            timerRef.current = setTimeout(() => {
                hideBubble(minAnim);
                hideBubble(maxAnim);
            }, 700);
        },
        [onMinChange, onMaxChange],
    );



    const [sliderWidth, setSliderWidth] = useState(0);
    const BUBBLE_WIDTH = wp('22%');

    const getThumbPosition = (val: number) => {
        if (!sliderWidth) return 0;
        const ratio = (val - min) / (max - min);
        const thumbRadius = wp('3%');
        const trackWidth = sliderWidth - thumbRadius * 2;
        return ratio * trackWidth + thumbRadius;
    };

    const bubbleStyle = (anim: Animated.Value) => ({
        opacity: anim,
        transform: [
            {
                translateY: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [6, 0],
                }),
            },
        ],
    });

    return (
        <View style={s.container}>

            <View
                style={[s.bubblesRow, { position: 'relative', height: 35 }]}
                onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
            >
                <View style={{
                    position: 'absolute',
                    left: getThumbPosition(localMin) - BUBBLE_WIDTH / 2,
                    bottom: 0,
                    width: BUBBLE_WIDTH,
                    alignItems: 'center',
                }}>
                    <Animated.View style={[s.bubble, bubbleStyle(minAnim)]}>
                        <Text style={s.bubbleText} numberOfLines={1}>
                            {formatPrice(localMin, max)}
                        </Text>
                        <View style={s.bubbleArrow} />
                    </Animated.View>
                </View>

                <View style={{
                    position: 'absolute',
                    left: getThumbPosition(localMax) - BUBBLE_WIDTH / 2,
                    bottom: 0,
                    width: BUBBLE_WIDTH,
                    alignItems: 'center',
                }}>
                    <Animated.View style={[s.bubble, bubbleStyle(maxAnim)]}>
                        <Text style={s.bubbleText} numberOfLines={1}>
                            {formatPrice(localMax, max)}
                        </Text>
                        <View style={s.bubbleArrow} />
                    </Animated.View>
                </View>
            </View>

            <RangeSlider
                style={s.slider}
                min={min}
                max={max}
                step={step}
                low={minValue}
                high={maxValue}
                onValueChanged={handleValueChange}
                renderThumb={Thumb}
                renderRail={Rail}
                renderRailSelected={RailSelected}
                renderLowValue={() => null}
                renderHighValue={() => null}
            />
            <View style={s.rangeRow}>
                <Text style={s.rangeLabel}>₹{min.toLocaleString()}</Text>
                <Text style={s.rangeLabel}>₹{max.toLocaleString()}</Text>
            </View>

        </View>
    );
};

export default PriceRange;


const s = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
    },
    priceSide: {
        gap: 3,
    },
    bubblesRow: {
        width: '100%',
        marginBottom: hp('0.5%'),
    },
    bubble: {
        alignItems: 'center',
        backgroundColor: PINK,
        paddingHorizontal: wp('2.5%'),
        paddingVertical: hp('0.5%'),
        borderRadius: 6,
    },
    bubbleText: {
        color: '#fff',
        fontSize: wp('2.8%'),
        fontFamily: FONTS.bold,
    },
    bubbleArrow: {
        position: 'absolute',
        bottom: -4,
        alignSelf: 'center',
        width: 8,
        height: 8,
        backgroundColor: PINK,
        transform: [{ rotate: '45deg' }],
    },

    slider: {
        width: '100%',
        height: hp('6%'),
    },

    thumb: {
        width: wp('6%'),
        height: wp('6%'),
        borderRadius: wp('3%'),
        borderWidth: 2,
        borderColor: '#fff',
    },
    rail: {
        flex: 1,
        height: hp('0.5%'),
        borderRadius: wp('1%'),
        backgroundColor: '#444',
    },
    railSelected: {
        flex: 1,
        height: hp('0.5%'),
        borderRadius: wp('1%'),
    },

    rangeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rangeLabel: {
        color: 'rgba(194, 187, 187, 1)',
        fontSize: wp('2.6%'),
        fontFamily: FONTS.regular,
    },
});