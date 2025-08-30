import Link from "next/link";
import React, { ReactNode } from "react";
import { ActionUiConfig } from "types/cms/banner/bannerWidget.types";

type ActionUIConfigProviderProps = {
  children: ReactNode;
  actionUiConfig: ActionUiConfig;
};

const ActionUIConfigProvider: React.FC<ActionUIConfigProviderProps> = (
  props,
) => {
  const { actionUiConfig, children } = props;
  const { type } = actionUiConfig || {};

  if (type === "banner") {
    return <Link href={"#"}> {children} </Link>;
  } else {
    return children;
  }
};

export default ActionUIConfigProvider;
