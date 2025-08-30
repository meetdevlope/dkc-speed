import { BrandOnboardStatusEnum } from "enums/brandOnBoardStatus.enum";
import { SocialMediaPlatformEnum } from "./socialPlatform.enum";

export type Brand = {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  website: string;
  description: string;
  logo: string;
  status: BrandOnboardStatusEnum;
  socialMedia: SocialMedia[];
  discussion: Discussion[];
  collab: boolean;
  active: boolean;
  createdDate: Date;
  bagImage: string;
  bagPrice: number;
  coverImage: string;
};

type Discussion = {
  user: string;
  status: BrandOnboardStatusEnum;
  message: string;
  createdDate: Date;
};

type SocialMedia = {
  name: SocialMediaPlatformEnum;
  url: string;
};
