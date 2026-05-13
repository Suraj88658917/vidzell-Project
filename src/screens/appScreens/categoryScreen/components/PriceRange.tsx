import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RangeSlider from 'rn-range-slider';

export const MIN_PRICE = 100;
export const MAX_PRICE = 30000;

// UI components
const Thumb = () => <View style={styles.thumb} />;
const Rail = () => <View style={styles.rail} />;
const RailSelected = () => <View style={styles.railSelected} />;

interface PriceRangeProps {
    min: number;
    max: number;
    onChange: (min: number, max: number) => void;
}

const PriceRange = ({ min, max, onChange }: PriceRangeProps) => {
    const [low, setLow] = useState(min);
    const [high, setHigh] = useState(max);

    useEffect(() => {
        setLow(min);
        setHigh(max);
    }, [min, max]);

    const handleValueChange = useCallback(
        (l: number, h: number) => {
            setLow(l);
            setHigh(h);
            onChange(l, h);
        },
        [onChange],
    );

    return (
        <View style={styles.container}>
            <RangeSlider
                style={styles.slider}
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={1}
                low={low}
                high={high}
                minRange={500}
                onValueChanged={handleValueChange}
                renderThumb={Thumb}
                renderRail={Rail}
                renderRailSelected={RailSelected}
            />

            <View style={styles.priceRow}>
                <View style={styles.priceBox}>
                    <Text style={styles.priceText}>₹{low}</Text>
                </View>

                <View style={styles.dash} />

                <View style={styles.priceBox}>
                    <Text style={styles.priceText}>₹{high}</Text>
                </View>
            </View>
        </View>
    );
};

export default PriceRange;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#020015',
    },

    slider: {
        width: '100%',
        height: 60,
    },

    thumb: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#EC4A8A',
    },

    rail: {
        flex: 1,
        height: 6,
        borderRadius: 10,
        backgroundColor: '#3A3A4D',
    },

    railSelected: {
        height: 6,
        borderRadius: 10,
        backgroundColor: '#EC4A8A',
    },

    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },

    priceBox: {
        flex: 1,
        height: 50,
        backgroundColor: '#1A1A2E',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    priceText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },

    dash: {
        width: 20,
        height: 2,
        backgroundColor: '#666',
        marginHorizontal: 10,
    },
});