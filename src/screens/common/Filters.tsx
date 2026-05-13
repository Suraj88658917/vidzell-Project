import React, {
    useState,
    useMemo,
} from 'react';

import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { wp, hp } from '../../utils/responsive';
import { FONTS } from '../../utils/fonts';
import PriceRange, { MIN_PRICE, MAX_PRICE } from '../appScreens/categoryScreen/components/PriceRange';

export type FilterPayload = {
    colors: string[];
    sizes: string[];
    discounts: string[];
    brands: string[];
    videoTypes: string[];
    minPrice: number;
    maxPrice: number;
};

type FilterModalProps = {
    visible: boolean;
    onClose: () => void;
    onApplySuccess?: (
        data: FilterPayload,
    ) => void;
};

type ChecklistPanelProps = {
    items: string[];
    selected: string[];
    onToggle: (item: string) => void;
};

type GradientCheckboxProps = {
    checked: boolean;
};

const PINK = '#d946a8';
const PURPLE = '#8b5cf6';

const GRAD = [PINK, PURPLE];

const TABS = [
    { key: 'color', label: 'Color' },
    { key: 'price', label: 'Price range' },
    { key: 'size', label: 'Size' },
    { key: 'discounts', label: 'Discounts' },
    { key: 'brand', label: 'Brand' },
    { key: 'videoType', label: 'Video Type' },
] as const;

const DATA = {
    color: [
        'All',
        'Assorted',
        'Beige',
        'Blue',
        'Bronze',
        'Burgundy',
        'Camel Brown',
        'Champagne',
        'Charcoal',
    ],

    size: ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],

    discounts: [
        '10% and above',
        '20% and above',
        '30% and above',
        '40% and above',
        '50% and above',
        '60% and above',
        '70% and above',
        '80% and above',
    ],

    brand: [
        'All',
        'H&M',
        'ZARA',
        'Mango',
        'Nike',
        'Calvin Klein',
        'Pantaloons',
        'Bebe',
    ],

    videoType: [
        'All',
        'Casual',
        'Styling',
        'Reviews',
        'Comparisons',
    ],
};

const makeToggle =
    (
        setter: React.Dispatch<
            React.SetStateAction<string[]>
        >,
    ) =>
        (item: string) => {
            setter((prev) => {
                if (item === 'All') {
                    return ['All'];
                }

                const filtered = prev.filter(
                    (i) => i !== 'All',
                );

                if (filtered.includes(item)) {
                    return filtered.filter(
                        (i) => i !== item,
                    );
                }

                return [...filtered, item];
            });
        };

const GradientCheckbox = ({
    checked,
}: GradientCheckboxProps) => {
    return (
        <View style={s.cbWrap}>
            {checked ? (
                <LinearGradient
                    colors={GRAD}
                    style={s.cbOn}
                >
                    <Text style={s.cbTick}>
                        ✓
                    </Text>
                </LinearGradient>
            ) : (
                <View style={s.cbOff} />
            )}
        </View>
    );
};

const ChecklistPanel = ({
    items,
    selected,
    onToggle,
}: ChecklistPanelProps) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            {items.map((item) => (
                <TouchableOpacity
                    key={item}
                    style={s.listRow}
                    activeOpacity={0.7}
                    onPress={() =>
                        onToggle(item)
                    }
                >
                    <Text style={s.listLabel}>
                        {item}
                    </Text>

                    <View pointerEvents="none">
                        <GradientCheckbox
                            checked={selected.includes(
                                item,
                            )}
                        />
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const Filters = ({
    visible,
    onClose,
    onApplySuccess,
}: FilterModalProps) => {
    const [activeTab, setActiveTab] =
        useState<string>('color');

    const [selectedColors, setSelectedColors] =
        useState<string[]>(['All']);

    const [selectedSizes, setSelectedSizes] =
        useState<string[]>([]);

    const [
        selectedDiscounts,
        setSelectedDiscounts,
    ] = useState<string[]>([]);

    const [selectedBrands, setSelectedBrands] =
        useState<string[]>([]);

    const [
        selectedVideoTypes,
        setSelectedVideoTypes,
    ] = useState<string[]>([]);

    const [minPrice, setMinPrice] =
        useState<number>(MIN_PRICE);

    const [maxPrice, setMaxPrice] =
        useState<number>(MAX_PRICE);

    const [loading, setLoading] =
        useState<boolean>(false);

    const clearAll = () => {
        setSelectedColors(['All']);
        setSelectedSizes([]);
        setSelectedDiscounts([]);
        setSelectedBrands([]);
        setSelectedVideoTypes([]);
        setMinPrice(MIN_PRICE);
        setMaxPrice(MAX_PRICE);
    };

    const handleApply = async () => {
        try {
            setLoading(true);

            const payload: FilterPayload = {
                colors: selectedColors,
                sizes: selectedSizes,
                discounts:
                    selectedDiscounts,
                brands: selectedBrands,
                videoTypes:
                    selectedVideoTypes,
                minPrice,
                maxPrice,
            };

            console.log(
                'FILTER PAYLOAD => ',
                payload,
            );

            onApplySuccess?.(payload);

            onClose();
        } catch (error) {
            console.log(
                'FILTER ERROR => ',
                error,
            );
        } finally {
            setLoading(false);
        }
    };

    const contentView = useMemo(() => {
        switch (activeTab) {
            case 'color':
                return (
                    <ChecklistPanel
                        items={DATA.color}
                        selected={
                            selectedColors
                        }
                        onToggle={makeToggle(
                            setSelectedColors,
                        )}
                    />
                );

            case 'price':
                return (
                    <PriceRange
                        min={minPrice}
                        max={maxPrice}
                        onChange={(min, max) => {
                            setMinPrice(min);
                            setMaxPrice(max);
                        }}
                    />
                );

            case 'size':
                return (
                    <ChecklistPanel
                        items={DATA.size}
                        selected={
                            selectedSizes
                        }
                        onToggle={makeToggle(
                            setSelectedSizes,
                        )}
                    />
                );

            case 'discounts':
                return (
                    <ChecklistPanel
                        items={
                            DATA.discounts
                        }
                        selected={
                            selectedDiscounts
                        }
                        onToggle={makeToggle(
                            setSelectedDiscounts,
                        )}
                    />
                );

            case 'brand':
                return (
                    <ChecklistPanel
                        items={DATA.brand}
                        selected={
                            selectedBrands
                        }
                        onToggle={makeToggle(
                            setSelectedBrands,
                        )}
                    />
                );

            case 'videoType':
                return (
                    <ChecklistPanel
                        items={
                            DATA.videoType
                        }
                        selected={
                            selectedVideoTypes
                        }
                        onToggle={makeToggle(
                            setSelectedVideoTypes,
                        )}
                    />
                );

            default:
                return null;
        }
    }, [
        activeTab,
        selectedColors,
        selectedSizes,
        selectedDiscounts,
        selectedBrands,
        selectedVideoTypes,
        minPrice,
        maxPrice,
    ]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
        >
            <View style={s.overlay}>
                <SafeAreaView style={s.modal}>
                    {/* HEADER */}

                    <View style={s.header}>
                        <Text
                            style={s.headerTitle}
                        >
                            Filters
                        </Text>

                        <TouchableOpacity
                            onPress={onClose}
                        >
                            <Text
                                style={s.closeIcon}
                            >
                                ✕
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* BODY */}

                    <View style={s.body}>
                        {/* SIDEBAR */}

                        <View style={s.sidebar}>
                            {TABS.map(
                                ({
                                    key,
                                    label,
                                }) => {
                                    const active =
                                        activeTab ===
                                        key;

                                    return (
                                        <TouchableOpacity
                                            key={key}
                                            style={[
                                                s.tabItem,
                                                active &&
                                                s.tabItemActive,
                                            ]}
                                            onPress={() =>
                                                setActiveTab(
                                                    key,
                                                )
                                            }
                                        >
                                            <View
                                                style={
                                                    s.tabRow
                                                }
                                            >
                                                {active && (
                                                    <LinearGradient
                                                        colors={[
                                                            '#EC4A8A',
                                                            '#7933AF',
                                                        ]}
                                                        start={{
                                                            x: 0,
                                                            y: 0,
                                                        }}
                                                        end={{
                                                            x: 0,
                                                            y: 1,
                                                        }}
                                                        style={
                                                            s.activeBar
                                                        }
                                                    />
                                                )}

                                                <Text
                                                    style={[
                                                        s.tabLabel,
                                                        active &&
                                                        s.tabLabelActive,
                                                        {
                                                            marginLeft:
                                                                active
                                                                    ? wp(
                                                                        '2%',
                                                                    )
                                                                    : wp(
                                                                        '3%',
                                                                    ),
                                                        },
                                                    ]}
                                                >
                                                    {
                                                        label
                                                    }
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                },
                            )}
                        </View>

                        {/* CONTENT */}

                        <View style={s.content}>
                            {contentView}
                        </View>
                    </View>

                    {/* FOOTER */}

                    <View style={s.footer}>
                        <TouchableOpacity
                            onPress={
                                clearAll
                            }
                        >
                            <Text
                                style={
                                    s.clearText
                                }
                            >
                                Clear all
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={loading}
                            onPress={
                                handleApply
                            }
                        >
                            <LinearGradient
                                colors={GRAD}
                                style={
                                    s.applyBtn
                                }
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text
                                        style={
                                            s.applyText
                                        }
                                    >
                                        Apply
                                    </Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

export default Filters;

const s = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor:
            'rgba(0,0,0,0.6)',
    },

    modal: {
        height: hp('60%'),
        backgroundColor: '#020015',
        borderTopLeftRadius: wp('5%'),
        borderTopRightRadius: wp('5%'),
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%'),
    },

    headerTitle: {
        color: '#fff',
        fontSize: wp('4.5%'),
        fontFamily: FONTS.bold,
    },

    closeIcon: {
        color: '#fff',
        fontSize: wp('5%'),
    },

    body: {
        flex: 1,
        flexDirection: 'row',
    },

    sidebar: {
        width: wp('28%'),
        backgroundColor:
            'rgba(0,0,0,0.09)',
    },

    tabItem: {
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('4%'),
    },

    tabItemActive: {
        backgroundColor: '#000',
    },

    tabRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    activeBar: {
        width: wp('1.2%'),
        height: hp('3%'),
        borderRadius: wp('2%'),
    },

    tabLabel: {
        color: '#bab6b6ff',
        fontSize: wp('3.2%'),
        fontFamily: FONTS.medium,
    },

    tabLabelActive: {
        color: '#fff',
        fontFamily: FONTS.bold,
    },

    content: {
        flex: 1,
    },

    listRow: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
    },

    listLabel: {
        color: '#fff',
        fontSize: wp('3.5%'),
    },

    cbWrap: {
        padding: wp('0.5%'),
    },

    cbOn: {
        width: wp('5.5%'),
        height: wp('5.5%'),
        borderRadius: wp('1.5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

    cbOff: {
        width: wp('5.5%'),
        height: wp('5.5%'),
        borderRadius: wp('1.5%'),
        borderWidth: 1.5,
        borderColor: '#555',
    },

    cbTick: {
        color: '#fff',
        fontSize: wp('3%'),
        fontFamily: FONTS.bold,
    },

    footer: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%'),
    },

    clearText: {
        color: '#fff',
        fontSize: wp('3.5%'),
        fontFamily: FONTS.regular,
    },

    applyBtn: {
        width: wp('50%'),
        height: hp('5%'),
        borderRadius: wp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    applyText: {
        color: '#fff',
        fontSize: wp('3.8%'),
        fontFamily: FONTS.bold,
    },
});