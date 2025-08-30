import Icon from "components/icon/Icon";
import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

export type DisabledDateRange = {
  start: Date;
  end: Date;
}[];

type PickerMode = "date" | "time" | "year";

export type DatePickerProps = {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  disableDates?: Date[];
  disabledDateRange?: DisabledDateRange;
  label?: string;
  disablePastDates?: boolean;
  mode?: PickerMode; // new prop to control mode
  showYearPicker?: boolean;
  maxDate?: Date;
};

const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  disableDates,
  disabledDateRange,
  label,
  disablePastDates = false,
  mode = "date", // default to date
  showYearPicker = false,
  maxDate,
}) => {
  const today = new Date();

  const ExampleCustomInput = forwardRef<
    HTMLButtonElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <button
      className="bg-beige flex w-full items-center justify-between rounded border border-gray-300 p-2 text-sm hover:bg-gray-100"
      onClick={onClick}
      ref={ref}
      type="button"
    >
      {value || "Select"}
      <Icon name="calendar" color="var(--primary-500)" size={20} />
    </button>
  ));

  ExampleCustomInput.displayName = "ExampleCustomInput";

  // Format settings based on mode
  const getDatePickerProps = () => {
    switch (mode) {
      case "time":
        return {
          showTimeSelect: true,
          showTimeSelectOnly: true,
          timeIntervals: 15,
          timeCaption: "Time",
          dateFormat: "h:mm aa",
        };
      case "year":
        return {
          showYearPicker: true,
          dateFormat: "yyyy",
        };
      case "date":
      default:
        return {
          dateFormat: "dd/MM/yyyy",
        };
    }
  };

  return (
    <div>
      {label && (
        <label className="text-secondary-700 mb-1 text-sm font-normal">
          {label}
        </label>
      )}
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        minDate={disablePastDates ? today : undefined}
        todayButton="Today"
        customInput={<ExampleCustomInput />}
        excludeDates={disableDates}
        excludeDateIntervals={disabledDateRange}
        showPopperArrow={false}
        portalId="root-portal"
        maxDate={maxDate}
        popperContainer={({ children }) => (
          <div className="relative z-[101010101010]">{children}</div>
        )}
        showYearDropdown={showYearPicker}
        {...getDatePickerProps()}
      />
    </div>
  );
};

export default DatePicker;
