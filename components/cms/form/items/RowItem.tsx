import React from "react";
import { FormItemProps } from "types/cms/form/formTypes";
import FormItemRenderer from "../FormItemRenderer";

const RowItem: React.FC<FormItemProps> = (props) => {
  const { config } = props;
  const { gap = 12, childrenConfig, align = "center" } = config || {};

  const comp = () =>
    childrenConfig?.map((child, index) => (
      <FormItemRenderer config={child} key={index} />
    ));

  return (
    <div
      className="flex w-full"
      style={{
        gap: `${gap}px`,
        alignItems: align,
      }}
    >
      {comp()}
    </div>
  );
};

export default RowItem;
