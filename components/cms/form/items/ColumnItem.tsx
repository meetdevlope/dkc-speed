import React from "react";
import { FormItemProps } from "types/cms/form/formTypes";
import FormItemRenderer from "../FormItemRenderer";

const ColumnItem: React.FC<FormItemProps> = (props) => {
  const { config } = props;
  const { gap = 12, childrenConfig, align = "center" } = config || {};

  const comp = () =>
    childrenConfig?.map((child, index) => (
      <FormItemRenderer config={child} key={index} />
    ));

  return (
    <div
      className="flex w-full flex-col"
      style={{
        gap: `${gap}px`,
        alignItems: align,
      }}
    >
      {comp()}
    </div>
  );
};

export default ColumnItem;
