export enum CommissionTypes {
  customerCash = "customerCash",
  customerCredit = "customerCredit",
  commissionCash = "commissionCash",
  commissionCredit = "commissionCredit",
}

export type Commission = {
  _id: string;
  startRange: number;
  endRange: number;
  percent: number;
  type: CommissionTypes;
  createdDate: string;
};
