import { AddressType } from "enums/addressType.enum";

export type Address = {
  _id?: string;
  line1: string;
  line2?: string;
  area: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  lat?: number;
  long?: number;
  personName: string;
  isDefault: boolean;
  personPhone?: string;
  otherLabel?: string;
  userId?: string;
  addressType: AddressType;
  countryIso?: string;
  stateIso?: string;
};

export type CreateAddressRequest = Pick<
  Address,
  | "personName"
  | "line1"
  | "line2"
  | "area"
  | "city"
  | "state"
  | "country"
  | "zipCode"
> & {
  countryIso?: string;
  stateIso?: string;
  isDefault?: boolean;
};

export type EditAddressRequest = Pick<
  Address,
  | "personName"
  | "line1"
  | "line2"
  | "area"
  | "city"
  | "state"
  | "country"
  | "zipCode"
> & {
  addressId: string;
};

export type Country = {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
  capital: string;
  currency: string;
  native: string;
  emoji: string;
};

export type State = {
  id: number;
  name: string;
  iso2: string;
};

export type City = {
  id: number;
  name: string;
};
