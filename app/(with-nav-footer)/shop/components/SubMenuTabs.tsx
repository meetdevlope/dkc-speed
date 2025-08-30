import ActionWrapper from "components/cms/action/ActionWrapper";
import { getCommonComponentDetails } from "components/cms/section/action";
import {
  CtaActionConfig,
  HeaderNavOptionType,
} from "types/cms/component.types";
import { jsonParser } from "utils/helpers";

const SubMenuTabs = async () => {
  const headerRes = await getCommonComponentDetails("header");
  const headerJson = jsonParser(headerRes?.json);
  const headerData: HeaderNavOptionType[] = headerJson?.navOptions;

  return (
    <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto overflow-y-hidden px-4 pb-2 lg:hidden">
      {Array.isArray(headerData) &&
        headerData?.length > 0 &&
        headerData?.map((item, index) => (
          <ActionWrapper
            onClickConfig={item?.ctaConfig as CtaActionConfig}
            key={index}
            linkClassName="fall"
          >
            <span className="rounded-sm border border-primary-500 px-3 py-1.5 text-xs text-nowrap text-primary-500">
              {item.label}
            </span>
          </ActionWrapper>
        ))}
    </div>
  );
};

export default SubMenuTabs;
