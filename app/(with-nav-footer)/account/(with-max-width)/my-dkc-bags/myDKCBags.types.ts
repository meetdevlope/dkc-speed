import { ReturnBagStatusTypes } from "enums/returnBagType.enum";

export type MyDKCBags = {
  _id: string;
  skuId: string;
  orderStatus: ReturnBagStatusTypes;
  userId: string;
  createdDate: string;
  updatedDate: string;
  __v: number;
};
