declare module "react-native-floating-label-input" {
  import React from "react";
  import { ViewStyle, TextStyle, KeyboardTypeOptions } from "react-native";

  interface CustomLabelStyles {
    colorFocused?: string;
    colorBlurred?: string;
    fontSizeFocused?: number;
    fontSizeBlurred?: number;
    leftFocused?: number;
    leftBlurred?: number;
    topFocused?: number;
    topBlurred?: number;
  }

  interface FloatingLabelInputProps {
    label: string;
    value: string;
    onChangeText?: (text: string) => void;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
    onFocus?: () => void;
    onBlur?: () => void;
    containerStyles?: ViewStyle;
    inputStyles?: TextStyle;
    labelStyles?: TextStyle;
    customLabelStyles?: CustomLabelStyles;
    secureTextEntry?: boolean;
    editable?: boolean;
    placeholder?: string;
    placeholderTextColor?: string;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    autoCorrect?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
    [key: string]: any;
  }

  export const FloatingLabelInput: React.FC<FloatingLabelInputProps>;
}

declare module "react-native-country-codes-picker" {
  import React from "react";
  import { ViewStyle, TextStyle } from "react-native";

  interface CountryItem {
    name: string;
    dial_code: string;
    flag: string;
    code: string;
  }

  interface CountryPickerStyles {
    modal?: ViewStyle;
    textInput?: ViewStyle & TextStyle;
    countryButtonStyles?: ViewStyle;
    countryName?: TextStyle;
    dialCode?: TextStyle;
    flag?: TextStyle;
    line?: ViewStyle;
  }

  interface CountryPickerProps {
    show: boolean;
    lang?: string;
    pickerButtonOnPress: (item: CountryItem) => void;
    onBackdropPress?: () => void;
    style?: CountryPickerStyles;
    initialState?: string;
  }

  export const CountryPicker: React.FC<CountryPickerProps>;
}