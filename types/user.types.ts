export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
  verificationCode: string;
  isVerified: boolean;
  active: boolean;
  __v: number;
  orderedItems: number;
  listedItems: number;
  documentVerificationId: string;
  documentVerified: boolean;
  cashWallet: number;
  creditWallet: number;
  stripeAccountId: string;
  countryCode: string;
  phoneNumber: string;
  stripeCustomerId: string;
  eligibleForPayout: boolean;
  commissionType: string;
};

export type UserWithTotalCartItems = {
  user: User;
  totalCartItems: string;
};

export type EditPersonalDetailsReq = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  profile?: string;
};
