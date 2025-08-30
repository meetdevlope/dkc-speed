import { Address } from "types/address.types";
import { isNullish } from "./helpers";

class AddressUtils {
  static getShortAddressString(address: Address) {
    return `${address.line1}, ${address.city}, ${address.zipCode}`;
  }

  static getPersonNameAndLabel(address: Address) {
    if (isNullish(address)) return AddressUtils.emptyAddressStr;
    return `${address.personName} (${
      address.addressType === "other" ? address.otherLabel : address.addressType
    })`;
  }

  static getLongAddressString(address: Address) {
    if (isNullish(address)) return AddressUtils.emptyAddressStr;

    const parts = [
      !isNullish(address.personName) ? `${address.personName}` : null,
      address.line1,
      address.line2,
      address.area,
      address.city,
      address.state,
      address.country,
      address.zipCode,
    ];

    const validParts = parts.filter((part) => !isNullish(part));

    return validParts.join(", ");
  }

  static isAddressEmpty(address: Address) {
    return (
      !address.line1 ||
      !address.area ||
      !address.city ||
      !address.country ||
      !address.zipCode
    );
  }

  static emptyAddressStr = "No Address Available";

  static getStringOrEmptyStringForAddress(
    address: Address,
    { showEmptyStr = false, isShort = false } = {},
  ) {
    const showStr = showEmptyStr && AddressUtils.isAddressEmpty(address);
    if (showStr) {
      return AddressUtils.emptyAddressStr;
    }
    return isShort
      ? AddressUtils.getShortAddressString(address)
      : AddressUtils.getLongAddressString(address);
  }
}

export default AddressUtils;
