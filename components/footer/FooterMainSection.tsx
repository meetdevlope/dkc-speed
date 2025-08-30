import React from "react";
import { MainCardType } from "types/cms/footer.types";
import { cn } from "utils/helpers";
import FooterMainSectionCard from "./FooterMainSectionCard";

type FooterMainSectionProps = {
  config: MainCardType;
};

const FooterMainSection: React.FC<FooterMainSectionProps> = (props) => {
  const { config } = props;

  if (config?.hidden) return <></>;

  const jsx = () => {
    if (config?.version === "v1") {
      return (
        <div className="flex h-24 divide-x divide-white rounded-2xl border border-white [&>*]:w-full">
          {config?.cards?.map((item, index) => (
            <FooterMainSectionCard
              key={index}
              config={item}
              mainSectionVersion={config?.version}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="mt-8 flex justify-center gap-x-4">
        {config?.cards?.map((item, index) => (
          <FooterMainSectionCard
            key={index}
            config={item}
            mainSectionVersion={config?.version}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        config?.version === "v1"
          ? "bg-transparent"
          : "rounded-3xl bg-primary-500 p-6",
        "w-full",
      )}
    >
      {!config?.hideTitle && (
        <h4 className={cn("mb-2 text-center text-white")}>
          {" "}
          {config?.title || ""}{" "}
        </h4>
      )}
      {!config?.hideCaption && (
        <p className="mb-4 text-center text-gray-300">{config?.caption}</p>
      )}
      {jsx()}
    </div>
  );
};

export default FooterMainSection;
