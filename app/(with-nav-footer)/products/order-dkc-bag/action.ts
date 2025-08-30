import { fetchData } from "utils/apiCaller";

export const getBagConfig = async (): Promise<BagConfigResponse> => {
  return fetchData<BagConfigResponse>(`/common/config?name=bag_config`, {
    errorMessage: "bag-config",
  });
};
export const getTaxExtraCharges = async (): Promise<TaxExtraCharges[]> => {
  return fetchData<TaxExtraCharges[]>(`/common/tax-and-extra-charges/list`, {
    errorMessage: "tax-extra-charges",
  });
};

export type BagConfigResponse = {
  _id: string;
  name: string;
  json: string;
  createdDate: string;
};

export type TaxExtraCharges = {
  _id: string;
  key: string;
  value: number;
  createdDate: string;
  valueType: string;
};

export type BagConfigJSON = {
  isBagAvailable: boolean;
  bagImage: string;
  bagPrice: number;
  brandCheckerComponentId: string;
  commissionStructureComponentId: string;
};
