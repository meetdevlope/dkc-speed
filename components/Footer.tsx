import { FooterConfigType } from "types/cms/footer.types";
import { jsonParser } from "utils/helpers";
import Accordion from "./Accordion";
import LocalizationPreferences from "./LocalizationPreferences";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ActionWrapper from "./cms/action/ActionWrapper";
import { getCommonComponentDetails } from "./cms/section/action";
import FooterMainSection from "./footer/FooterMainSection";
import FooterSocialMedia from "./footer/FooterSocialMedia";

const Footer = async () => {
  const footerRes = await getCommonComponentDetails("footer");
  const footerData: FooterConfigType = jsonParser(footerRes?.json);

  const accordionItems = footerData?.linkGroups?.map((item, index) => ({
    id: `footer-${index}`,
    title: item?.label,
    content: (
      <div className="flex flex-col gap-y-3">
        {item?.links?.map((link, linkIndex) => {
          if (!link?.actionConfig) {
            return <span key={linkIndex}> {link?.label} </span>;
          }
          return (
            <ActionWrapper
              key={linkIndex}
              onClickConfig={link?.actionConfig}
              className="text-neutral-400 transition-all hover:font-medium hover:text-neutral-500"
            >
              {link.label}
            </ActionWrapper>
          );
        })}
      </div>
    ),
  }));

  return (
    <footer className="bg-neutral-500 lg:bg-white">
      <div className="bg-neutral-500 py-4">
        <MaxWidthWrapper className="flex flex-col items-center gap-x-8 p-4 lg:flex-row lg:[&>*]:w-1/2">
          <FooterMainSection config={footerData?.mainLeftCard} />
          <div className="hidden lg:block">
            <FooterMainSection config={footerData?.mainRightCard} />
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <div className="rounded-t-4xl bg-white p-4">
          <div className="block lg:hidden">
            <FooterMainSection config={footerData?.mainRightCard} />
          </div>{" "}
          <div className="mt-4 mb-8">
            <Accordion items={accordionItems} />
          </div>
          <div className="flex flex-col items-center justify-between md:flex-row">
            {!footerData?.hideCurrencySelection && (
              <LocalizationPreferences
                className="-mx-4 my-4 px-8 py-4"
                isFooter
              />
            )}
            <FooterSocialMedia config={footerData?.socialMediaInfo} />
          </div>
          <p className="mt-4 text-center">
            {footerData?.copyRightCaption ||
              "© 2020-2025 Designer Kids Club. All rights reserved."}
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
