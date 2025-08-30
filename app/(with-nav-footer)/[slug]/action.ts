import { fetchData } from "utils/apiCaller";

export type PageBuilderType = {
  _id: string;
  title: string;
  createdDate: string;
  updatedDate: string;
  slug: string;
  description: string;
  sectionList: string;
};

export type SectionPadding =
  | { type: "all"; all: number }
  | {
      type: "individual";
      paddingT?: number;
      paddingR?: number;
      paddingB?: number;
      paddingL?: number;
    };

export interface SectionConfig {
  sectionId: string;
  padding: SectionPadding;
  webPadding: SectionPadding;
  tabPadding: SectionPadding;
  uniqueId: string;
}

export const getPageConfig = async (slug: string): Promise<PageBuilderType> => {
  return fetchData<PageBuilderType>(`/cms/page-builder/details/${slug}`, {
    errorMessage: `${slug}-page-config`,
  });
};
