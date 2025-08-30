export type FormItemType =
  | "text"
  | "number"
  | "email"
  | "address"
  | "long_text"
  | "check_box"
  | "radio_button"
  | "drop_down"
  | "file"
  | "date"
  | "year"
  | "row"
  | "column"
  | "grid"
  | "textLabel"
  | "submit"
  | "reset"
  | "image"
  | "surface"
  | "time";

export type FormSettings = {
  gap?: number;
  paddingX?: number;
  paddingY?: number;
  width?: number;
  align?: "start" | "center" | "end";
  label: string;
};

export type TextWidgetConfig = {
  textValue: string;
  size: "sm" | "md" | "lg" | "xl";
  weight: "bold" | "light" | "regular";
  align: "left" | "center" | "right";
  isMarkdown?: boolean;
  isHtml?: boolean;
};

export type FormItemTypeInfo = {
  id: string;
  // general
  type: FormItemType;
  label?: string;
  fieldName: string;
  hintText?: string;
  // validation
  isRequired?: boolean;
  requiredErrorText?: string;
  additionalValidations?: FormValidationCondition[];
  isPrimaryColor?: boolean;
  isSubmitInSuffix?: boolean;

  // textarea
  lines?: number;
  // address
  addressConfig?: AddressFormConfig;
  // dropdown
  menuItems?: FormDropDownItemType[];
  // radio && checkbox
  validValue?: string;
  defaultCheck?: boolean;
  radioBtnItems?: RadioButtonItemConfig[];
  radioBtnLabel?: string;
  // css properties
  paddingX?: number;
  paddingY?: number;
  // 0 to 100 (keep it integer)
  width?: number;
  // text
  fontSize?: number;
  fontWeight?: TextWidgetConfig["weight"];
  textColor?: string;

  // file
  fileSize?: number;
  fileType?: "image" | "doc" | "video";

  // layout common
  childrenConfig?: FormItemTypeInfo[];
  gap?: number;

  // row, column
  align?: "start" | "center" | "end";

  // grid
  columns?: number;

  // button
  btnVariant?: "filled" | "outlined" | "text";

  // image
  url?: string;
  fit?: "cover" | "contain";
  ratio?: number;

  // surface
  color?: string;
  surfacePaddingX?: number;
  surfacePaddingY?: number;
  childConfig?: FormItemTypeInfo;
};

export type RadioButtonItemConfig = {
  label: string;
  value: string;
  id: string;
};

export type AddressFormConfig = {
  country?: LabelAndPlaceHolder;
  state?: LabelAndPlaceHolder;
  city?: LabelAndPlaceHolder;
  area?: LabelAndPlaceHolder;
  zip?: LabelAndPlaceHolder;
  line1?: LabelAndPlaceHolder;
  line2?: LabelAndPlaceHolder;
  hiddenElements?: Record<
    "line1" | "line2" | "city" | "area" | "zip" | "state" | "country",
    boolean
  >;
};

export type LabelAndPlaceHolder = {
  label?: string;
  placeHolder?: string;
  fieldName?: string;
  isRequired?: boolean;
  requiredErrorText?: string;
};

export type FormDropDownItemType = {
  label: string;
  value: string;
  isDisabled?: boolean;
  id: string;
};

export type FormValidationCondition = {
  regex?: string;
  errorText: string;
};

export type FormItemProps = {
  config: FormItemTypeInfo;
};
