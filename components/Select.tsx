import React from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import ErrorText from "./ErrorText";

export type DropdownOption = {
  label: string;
  value: string;
  additional?: Record<string, string>;
};

const isBrowser = typeof window !== "undefined";

export interface CustomSelectProps {
  options: DropdownOption[];
  selectedOption: DropdownOption | DropdownOption[] | null;
  onChange: (
    selected: SingleValue<DropdownOption> | MultiValue<DropdownOption> | null,
  ) => void;
  onBlur?: () => void;
  onInputChange?: (value: string) => void;
  label?: string;
  isSearchable?: boolean;
  isMulti?: boolean;
  loading?: boolean;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  helperText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  defaultValue?: string;
  noOptionsText?: string;
  placeholder?: string;
  variant?: "default" | "minimal";
  isPortal?: boolean;
  inputValue?: string;
  menuPlacement?: "top" | "bottom" | "auto";
  noPlaceholder?: boolean;
  isRequired?: boolean;
  menuWidth?: number | string;
  getOptionLabel?: (option: DropdownOption) => string;
  formatOptionLabel?: (
    option: DropdownOption,
    context: { context: "menu" | "value" },
  ) => React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const {
    onChange,
    options,
    selectedOption,
    isMulti,
    isOpen,
    isSearchable,
    label,
    loading,
    onClose,
    onBlur,
    onOpen,
    error,
    helperText,
    defaultValue,
    isPortal,
    noOptionsText,
    formatOptionLabel,
    getOptionLabel,
    noPlaceholder = false,
    placeholder,
    menuWidth,
    onInputChange,
    inputValue,
    variant = "default",
    menuPlacement = "auto",
    isRequired = false,
  } = props;

  const labelNew = isRequired ? `${label} *` : label;

  return (
    <div className="h-full w-full">
      {label && (
        <label
          className={`mb-1 block text-sm ${error ? "text-danger-500" : "text-neutral-400"}`}
        >
          {labelNew}
        </label>
      )}
      <Select
        options={options}
        value={selectedOption}
        onChange={(selected) => onChange(selected)}
        isSearchable={isSearchable}
        isMulti={isMulti}
        className="react-select-container h-full"
        classNamePrefix="react-select"
        placeholder={noPlaceholder ? null : placeholder || `Select ${label}`}
        isLoading={loading}
        menuIsOpen={isOpen}
        onMenuOpen={onOpen}
        inputValue={inputValue}
        onMenuClose={onClose}
        onBlur={onBlur}
        defaultInputValue={defaultValue}
        menuPortalTarget={isBrowser && isPortal ? document.body : null}
        noOptionsMessage={() => noOptionsText || "No options"}
        onInputChange={onInputChange}
        menuPlacement={menuPlacement}
        components={{
          IndicatorSeparator: () => null,
        }}
        theme={(theme) => ({
          ...theme,
        })}
        styles={
          variant === "minimal"
            ? {
                control: (base) => ({
                  ...base,
                  border: "none",
                  boxShadow: "none",
                  background: "transparent",
                  cursor: "pointer",
                  minHeight: "unset",
                  fontSize: "16px",
                  fontWeight: "500",
                }),
                valueContainer: (base) => ({
                  ...base,
                  padding: "0",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#000000",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }),
                indicatorsContainer: (base) => ({
                  ...base,
                  paddingLeft: "4px",
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                  overflow: "hidden",
                  marginTop: "8px",
                  width: menuWidth ? menuWidth : "auto",
                  zIndex: 9999,
                }),
                menuList: (base) => ({
                  ...base,
                  padding: "8px 0",
                }),
                option: (base, state) => ({
                  ...base,
                  padding: "8px 16px",
                  cursor: "pointer",
                  backgroundColor: state.isSelected ? "#f0f0f0" : "white",
                  color: "#000000",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  ":hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }),
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }
            : {
                control: (base, state) => ({
                  ...base,
                  outline: 0,
                  // height: "100%",
                  borderColor: error
                    ? "var(--danger-500)"
                    : state.isFocused
                      ? "var(--primary-300)"
                      : "var(--primary-200)",
                  borderRadius: 6,
                  // paddingBlock: "4px",
                  fontSize: 16,
                  background: "var(--primary-100)",
                  ":hover": {
                    borderColor: error
                      ? "var(--danger-600)"
                      : "var(--primary-300)",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                  width: menuWidth ? menuWidth : "auto",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isSelected
                    ? "var(--primary-400)"
                    : "white",
                  fontSize: 16,
                }),
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }
        }
        getOptionLabel={getOptionLabel}
        formatOptionLabel={formatOptionLabel}
      />
      {error && <ErrorText className="mt-1 !text-xs"> {helperText} </ErrorText>}
    </div>
  );
};

export default CustomSelect;
