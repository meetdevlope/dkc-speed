import { SEO } from "./seo.types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PageFilters = {
  label: string;
  id: string;
  options: CollectionConditionOption[];
};

export type CollectionConditionOption = {
  label: string;
  type: "subCollection" | "productCondition";
  productCondition?: any;
  collectionSlug?: string;
  id: string;
};

export type Collection = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  pageFilters: PageFilters[];
  filtersToRetrieveProducts: any;
  quickFilters: PageFilters;
  imageUrl: string;
  seo: SEO;
};
