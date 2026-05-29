export type StackParamList = {
  Splash: undefined;
  WalkThrough: undefined;
  Login: undefined;
  SignUp: undefined;
  MainTabs: undefined;
  VerifyOTP: { phone: string, mode: "LOGIN" | "REGISTER"; };
  Terms: undefined;
  Privacy: undefined;
  TermsConditions: undefined;
  PrivacyPolicy: undefined;
  SelectCategories: undefined;
  Notification: undefined;
  CategoryItem: undefined;
  SearchScreen: undefined;
  DetailsScreen: undefined;
  SizeChart: undefined;
  Review: undefined;
  NewAddress: undefined;
  SelectDeliveryLocation: undefined;
  EditAddress: {
    address: {
      id: string;
      label: string;
      pincode: string;
      address: string;
      phone: string;
      city?: string;
      state?: string;
    };
  };
};

export type TabParamList = {
  Home: undefined;
  Cart: undefined;
  Category: undefined;
  Wishlist: undefined;
  Reel: undefined

};