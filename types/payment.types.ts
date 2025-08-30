export type PaymentMethodResponse = {
  name: string;
  _id: string;
  details: Details[];
  logo?: string;
};

type Details = {
  key: string;
  value: string;
};
