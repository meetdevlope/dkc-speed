import { CtaActionConfig } from "./component.types";

export type MainCardType = {
  title: string;
  caption: string;
  hideTitle: boolean;
  hideCaption: boolean;
  version: "v1" | "v2";
  cards: FooterMainCardType[];
  hidden: boolean;
};

export type FooterMainCardType = {
  image: string;
  caption: string;
  hideImage: boolean;
  hideCaption: boolean;
  isAction: boolean;
  externalLink: string;
  id: string;
};

export type FooterLinkType = {
  label: string;
  id: string;

  actionConfig: CtaActionConfig;
};

export type FooterLinkGroupType = {
  id: string;
  label: string;
  links: FooterLinkType[];
};

export type SocialMediaGroup = {
  title: string;
  hideTitle: boolean;
  hidden: boolean;
  cards: FooterMainCardType[];
};

export type FooterConfigType = {
  mainLeftCard: MainCardType;
  mainRightCard: MainCardType;
  linkGroups: FooterLinkGroupType[];
  socialMediaInfo: SocialMediaGroup;
  hideCurrencySelection: boolean;
  copyRightCaption: string;
};
