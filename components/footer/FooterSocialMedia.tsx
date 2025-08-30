import React from "react";
import { SocialMediaGroup } from "types/cms/footer.types";
import FooterMainSectionCard from "./FooterMainSectionCard";

interface FooterSocialMediaProps {
  config: SocialMediaGroup;
}

const FooterSocialMedia: React.FC<FooterSocialMediaProps> = (props) => {
  const { config } = props;
  const { cards, hidden, hideTitle, title } = config || {};

  if (hidden) return <></>;

  return (
    <div>
      {!hideTitle && <h6 className="text-center"> {title} </h6>}
      <div className="mt-4 flex items-center justify-center gap-x-4">
        {cards?.map((item, index) => (
          <FooterMainSectionCard
            key={index}
            config={item}
            mainSectionVersion={"v1"}
            textClass="text-black"
          />
        ))}
      </div>
    </div>
  );
};

export default FooterSocialMedia;
