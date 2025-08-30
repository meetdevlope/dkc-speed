import { Button } from "components/Button";
import React, { CSSProperties, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { FormItemTypeInfo } from "types/cms/form/formTypes";
import AddressItem from "./items/AddressItem";
import CheckboxItem from "./items/CheckboxItem";
import ColumnItem from "./items/ColumnItem";
import DropdownItem from "./items/DropdownItem";
import RadioItem from "./items/RadioItem";
import RowItem from "./items/RowItem";
import TextAreaItem from "./items/TextAreaItem";
import TextField from "./items/TextField";
import TextLabel from "./items/TextLabel";
import FileItem from "./items/FileItem";
import DatePickerItem from "./items/DatePickerItem";

type FormItemRendererProps = {
  config: FormItemTypeInfo;
};

const FormItemRenderer: React.FC<FormItemRendererProps> = (props) => {
  const { config } = props;
  const { paddingX, paddingY, width, type } = config || {};

  const formItemStyles: CSSProperties = useMemo(
    () => ({
      paddingInline: `${paddingX}px`,
      paddingBlock: `${paddingY}px`,
      width: `${width}%`,
    }),
    [paddingX, paddingY, width],
  );

  const { reset } = useFormContext();

  const handleReset = () => {
    reset();
  };

  const comp = () => {
    switch (type) {
      case "textLabel":
        return <TextLabel config={config} />;
      case "text":
      case "email":
      case "number":
        return <TextField config={config} />;
      case "long_text":
        return <TextAreaItem config={config} />;
      case "check_box":
        return <CheckboxItem config={config} />;
      case "radio_button":
        return <RadioItem config={config} />;
      case "drop_down":
        return <DropdownItem config={config} />;
      case "address":
        return <AddressItem config={config} />;
      case "date":
        return <DatePickerItem config={config} mode={"date"} />;
      case "time":
        return <DatePickerItem config={config} mode={"time"} />;
      case "year":
        return <DatePickerItem config={config} mode={"year"} />;
      case "row":
        return <RowItem config={config} />;
      case "column":
        return <ColumnItem config={config} />;
      case "file":
        return <FileItem config={config} />;
      case "submit":
        return (
          <Button type="submit" fullWidth>
            {" "}
            {config.label}{" "}
          </Button>
        );
      case "reset":
        return (
          <Button type="button" variant="outline" onClick={handleReset}>
            {config.label}
          </Button>
        );
      default:
        return `Invalid form item type - ${type}`;
    }
  };

  return (
    <div style={formItemStyles} className="w-full">
      {comp()}
    </div>
  );
};

export default FormItemRenderer;
