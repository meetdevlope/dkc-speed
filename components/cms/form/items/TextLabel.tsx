import React from "react";
import { FormItemProps } from "types/cms/form/formTypes";

const TextLabel: React.FC<FormItemProps> = (props) => {
  const { config } = props;
  const {
    label,
    fontSize = 16,
    fontWeight,
    textColor,
    align = "start",
  } = config || {};

  return (
    <h6
      style={{
        fontSize: fontSize + "px",
        fontWeight,
        color: textColor || "black",
        textAlign: align,
      }}
    >
      {label}
    </h6>
  );
};

export default TextLabel;
